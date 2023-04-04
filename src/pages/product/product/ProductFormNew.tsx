import React, { useEffect, useState, useRef } from "react"
import { Form, Input, Button, Select, Tooltip, Row, Col, Table, Modal, InputNumber, Divider } from "antd"
import { TfiReload } from "react-icons/tfi"
import { dataType, TypeType } from "../../../utils/propsDummy/BrandProps";
import SizeBoxes from "./CheckBoxesForSize";
import { useQuery } from "../../../utils/queryParams";
import { useNavigate, useParams } from "react-router-dom";
import { InputField, InputNumberField, SelectField, SubmitBtn } from "../../../components/formInputs/CoreFormFields";
import { FormLayoutV1 } from "../../../components/formLayouts/FormLayoutV1";
import { ImageUploaderInput, InputSizeField } from "../../../components/formInputs/CustomFormFields";
import { PlusCircleOutlined } from '@ant-design/icons';
import { PopupAddColorModal, PopupAddSizeModal } from "../../../components/modals/PopupAddModal";
import { TypeModelFull, useGetTypesQuery } from "../../../redux/apiSlicers/ProductType";
import { PropertyModelFull, PropertyValue, useGetPropertyByIdQuery, useGetPropertysQuery } from "../../../redux/apiSlicers/Property";
import { IPropList, ISizeProp, ProductModelForm, useAddProductMutation, useUpdateProductMutation } from "../../../redux/apiSlicers/Product";
import { ModelModelForm, ModelModelFull, useGetModelsQuery } from "../../../redux/apiSlicers/Model";
import { ColumnsType } from "antd/lib/table";
import { Deletebtn } from "../../../components/buttons/Deletebtn";
import { Viewbtn } from "../../../components/buttons/Viewbtn";
import { useGetStoresQuery } from "../../../redux/apiSlicers/Store";
import { Dispatch, SetStateAction } from "react";
import { notifyError } from "../../../utils/alert";
import ModelEditor from "../../../components/editors/ModelEditor";
import { Editor as TinyMCEEditor } from 'tinymce';

interface AddColorComponentType {
    prodType: TypeType
}
interface AddSizeComponentType {
    prodType: TypeType
}

const AddColorComponent: React.FC<AddColorComponentType> = ({ prodType }) => {
    const [open, setOpen] = useState(false)

    return <>
        <Tooltip title="Thêm màu mới"><PlusCircleOutlined style={{ cursor: "pointer" }} onClick={() => setOpen(true)} /></Tooltip>
        <PopupAddColorModal
            title={`Thêm màu mới cho ${prodType.name}`}
            open={open}
            setOpen={setOpen}
            onCancel={() => setOpen(false)}
            productType={prodType}
        />
    </>
}

const AddSizeComponent: React.FC<AddSizeComponentType> = ({ prodType }) => {
    const [open, setOpen] = useState(false)

    return <>
        <Tooltip title="Thêm kích thước mới"><PlusCircleOutlined style={{ cursor: "pointer" }} onClick={() => setOpen(true)} /></Tooltip>
        <PopupAddSizeModal
            title={`Thêm size mới cho ${prodType.name}`}
            open={open}
            setOpen={setOpen}
            onCancel={() => setOpen(false)}
            productType={prodType}
        />
    </>
}


function initialFormValue() {
    return {
        sku: "",
        name: "",
        modelId: "",
        storeId: "",
        description: "",
        price: 0,
        values: [] as IPropList[]
    }
}

interface IModalPropertyQuantity {
    propertyValueId: string,
    listProp: IPropList[],
    setListProp: Dispatch<SetStateAction<IPropList[]>>,
    sizes: PropertyValue[],
    allSizes?: PropertyModelFull,
    setSizes: Dispatch<SetStateAction<PropertyValue[]>>,
    SizeInput: (propertyValueId: string) => JSX.Element,
    defaultDiscount: number,
    defaultQuantity: number
}

function ModalPropertyQuantity({ propertyValueId, listProp, setListProp, sizes, allSizes, setSizes, SizeInput, defaultDiscount, defaultQuantity }: IModalPropertyQuantity) {
    const [isModalOpenLevel1, setIsModalOpenLevel1] = useState(false);
    let item = listProp.find(i => i.propertyValueId === propertyValueId);

    const handleSubmit = () => {
        console.log(sizes)
        setListProp((prev: IPropList[]) => {
            return prev.map(i => {
                if (i.propertyValueId === propertyValueId) {
                    return {
                        ...i,
                        sizes: sizes.map(({ id }) => {
                            console.log(i.sizes)
                            return {
                                propertyValueId: id as string,
                                quantity: i.sizes.find(i => i.propertyValueId === id)?.quantity || defaultQuantity,
                                discountPrice: defaultDiscount
                            }
                        }) as ISizeProp[],
                    }
                }
                return i
            })
        })
        setIsModalOpenLevel1(false)
    }

    return <>
        <div
            style={{ textAlign: "center" }}
        >
            <Button type="primary" onClick={() => {
                setIsModalOpenLevel1(true)
                if (item && item?.sizes.length > 0) {
                    setSizes(item.sizes.map(i => {
                        return {
                            id: i.propertyValueId,
                            value: i.quantity
                        }
                    }) as PropertyValue[])
                } else {
                    setSizes([] as PropertyValue[])
                }


            }}>Thay đổi</Button>
        </div>
        <Modal title="Chọn kích thước - size" open={isModalOpenLevel1}
            onOk={() => handleSubmit()}
            cancelText="Hủy"
            onCancel={() => { setIsModalOpenLevel1(false); setSizes([]) }}>
            {SizeInput(propertyValueId)}
        </Modal>
    </>
}

export const ProductFormNew: React.FC = () => {
    const query = useQuery()
    const navigate = useNavigate()
    const ProductTypeQuery = useGetTypesQuery()
    const ModelQuery = useGetModelsQuery()
    const [addProduct, { isLoading, isSuccess }] = useAddProductMutation()
    const [models, setModels] = useState<ModelModelFull[]>()
    const [productType, setProductType] = useState<TypeType | null>()
    const [defaultQuantity, setDefaultQuantity] = useState(1)
    const [defaultDiscount, setDefaultDiscount] = useState(0)
    const { data: getSizes, refetch: refetchGetSize } = useGetPropertysQuery(undefined, {
        selectFromResult: ({ data }) => {
            return {
                data: data?.find(i => i.name === "size" && i.productType.id === productType?.id)
            }
        },
        skip: !productType
    })
    const { data: Colors, refetch: refetchGetColor } = useGetPropertysQuery(undefined, {
        selectFromResult: ({ data }) => {
            return {
                data: data?.find(i => i.name === "color" && i.productType.id === productType?.id)
            }
        },
        skip: !productType
    })
    const { data: Stores } = useGetStoresQuery()
    const [sizes, setSizes] = useState<PropertyValue[]>([])
    const [dataProduct, setDataProduct] = useState<ProductModelForm>(initialFormValue());
    const [listProp, setListProp] = useState<IPropList[]>([])
    const editorRef = useRef<TinyMCEEditor | null>(null);
    console.log(sizes)

    function SizeInput(propertyValueId: String) {
        return <InputSizeField>
            {
                getSizes ?
                    <SizeBoxes sizes={getSizes.values} selectedSizes={sizes} setSizes={setSizes}
                        editForm={false}
                        defaultValue={
                            listProp.find(i => i.propertyValueId === propertyValueId)?.sizes
                        }>
                        {productType?.id &&
                            <AddSizeComponent prodType={productType} />
                        }
                    </SizeBoxes>
                    :
                    <>
                        {productType?.id &&
                            <AddSizeComponent prodType={productType} />
                        }
                    </>
            }
        </InputSizeField>
    }


    const handleFinish = () => {
        if (dataProduct.modelId === "") {
            return notifyError("Phải chọn kiểu mẫu cho sản phẩm")
        }
        if (dataProduct.storeId === "") {
            return notifyError("Phải chọn cửa hàng cho sản phẩm")
        }
        if (listProp.length === 0) {
            return notifyError("Chọn ít nhất 1 màu cho sản phẩm")
        }
        console.log(listProp)
        for (let item of listProp) {
            if (item.sizes.length === 0) {
                return notifyError("Chọn ít nhất 1 size cho mỗi màu")
            }
        }
        console.log({ ...dataProduct, values: listProp })
        addProduct(
            { ...dataProduct, values: listProp, description: editorRef.current?.getContent() }
        )

    }



    const columns: ColumnsType<IPropList> = [
        {
            title: 'Màu sắc',
            dataIndex: 'propertyValueId',
            key: 'propertyValueId',
            render: (value: string) => {
                return Colors?.values.find(i => i.id === value)?.value
            },
            width: "10%",
        },
        {
            title: <>
                <div style={{ display: "flex", gap: 15, marginBottom: 5 }}>
                    <span style={{ display: "inline-block", width: 200 }}>Kích thước: Số lượng</span>
                    <InputNumber min={0}
                        max={1000}
                        value={defaultQuantity}
                        onChange={val => setDefaultQuantity(val as number)}
                    />
                </div>
                <div style={{ display: "flex", gap: 15 }}>
                    <span style={{ display: "inline-block", width: 200 }}>Giá giảm: Giá cần giảm</span>
                    <InputNumber min={0}
                        style={{ width: 150 }}
                        max={100000000}
                        value={defaultDiscount}
                        onChange={val => setDefaultDiscount(val as number)}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    />
                </div>
            </>,
            dataIndex: 'sizes',
            key: 'sizes',
            render: (value: ISizeProp[], record: IPropList) => {
                const handleChangeQuantity = (value: number, propertyValueId: string) => {
                    setListProp(prev => {
                        return prev.map(i => {
                            if (i.propertyValueId === record.propertyValueId) {
                                return {
                                    ...i,
                                    sizes: i["sizes"].map(i => {
                                        if (i.propertyValueId === propertyValueId) {
                                            i.quantity = value
                                        }
                                        return i
                                    }) as ISizeProp[]
                                }
                            }
                            return i
                        })
                    })
                }
                const handleChangePrice = (value: number, propertyValueId: string) => {
                    setListProp(prev => {
                        return prev.map(i => {
                            if (i.propertyValueId === record.propertyValueId) {
                                return {
                                    ...i,
                                    sizes: i["sizes"].map(i => {
                                        if (i.propertyValueId === propertyValueId) {
                                            i.discountPrice = value
                                        }
                                        return i
                                    }) as ISizeProp[]
                                }
                            }
                            return i
                        })
                    })
                }

                return <>
                    <div>
                        {Array.isArray(value) && <Row gutter={24}>{value.map((item, i) => {
                            return <Col span={8} key={i}>
                                <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}
                                    style={{ marginBottom: 7 }}
                                    label={getSizes?.values.find(i => i.id === item.propertyValueId)?.value}
                                >
                                    <InputNumber min={0} defaultValue={defaultQuantity} style={{ width: "100%" }}
                                        onChange={val => handleChangeQuantity(val as number, item.propertyValueId)}
                                    />

                                </Form.Item>
                                <Form.Item label="Giá giảm" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
                                    <InputNumber min={0}
                                        max={100000000}
                                        defaultValue={defaultDiscount}
                                        style={{ width: "100%" }}
                                        onChange={val => handleChangePrice(val as number, item.propertyValueId)}
                                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    // parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                                    />
                                </Form.Item>
                                <Divider />
                            </Col>
                        })}</Row>}
                    </div>
                    <ModalPropertyQuantity
                        propertyValueId={record.propertyValueId}
                        listProp={listProp}
                        setListProp={setListProp}
                        sizes={sizes}
                        allSizes={getSizes}
                        setSizes={setSizes}
                        SizeInput={SizeInput}
                        defaultDiscount={defaultDiscount}
                        defaultQuantity={defaultQuantity}
                    />
                </>
            },
            width: "45%",

        },
        {
            title: 'Hình ảnh - 900x900',
            dataIndex: 'images',
            key: 'images',
            render: (value: string[], record: IPropList) => {
                if (record.propertyValueId) {
                    return <ImageUploaderInput
                        labelColSpan={0} wrapperColSpan={24}
                        multipleAllow={true} setState={setListProp} name="images" propertyValueId={record.propertyValueId} />
                }
                return <></>
            },
            width: "35%",
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (record: IPropList) => {
                return <>
                    <Deletebtn text='Xóa' action={() => {
                        setListProp(prev => {
                            return prev.filter(i => i.propertyValueId !== record.propertyValueId)
                        })
                    }} />
                </>
            },
            width: "10%",
        },
    ]

    useEffect(() => {
        const producTypeID = query.get("type")
        if (producTypeID) {
            const resultProductType = ProductTypeQuery.data?.find((item: TypeModelFull) => item.id === producTypeID)
            const resutModels = ModelQuery.data?.filter((item: ModelModelFull) => item.productType.id === producTypeID)
            setModels(resutModels)
            resultProductType ? setProductType(resultProductType) : navigate("/product")
        }
    }, [productType, getSizes, navigate, query, ModelQuery.data?.length])

    useEffect(() => {
        if (isSuccess) {
            setListProp([] as IPropList[])
            setDataProduct(prev => {
                return {
                    ...prev,
                    sku: "",
                    name: "",
                    price: 0
                }
            })
        }
    }, [isSuccess])

    function AddColorProp(color: string) {
        if (!listProp?.map(i => i.propertyValueId).includes(color) && color) {
            setListProp((prev: IPropList[]) => {
                return [
                    ...prev,
                    {
                        propertyValueId: color,
                        sizes: [] as ISizeProp[],
                        images: [] as string[]
                    }
                ]
            })
        }
    }


    return <>
        <FormLayoutV1
            title={`Tạo Sản Phẩm Mới - ${productType?.name}`}
            styleWrapper={{ maxWidth: "100%", backgroundColor: "white", padding: "20px 0 20px 10px" }}
        >
            <Form
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 8 }}
                layout="horizontal"
                onFinish={handleFinish}
            >
                <SelectField label="Cửa hàng" name="storeId"
                    setState={setDataProduct}
                    defaultValue="Chọn cửa hàng"
                    options={
                        Stores?.map(item => {
                            return {
                                id: item.id,
                                name: item.name
                            }
                        })
                    }
                />
                <InputField label="SKU" name="sku" required={true} value={dataProduct?.sku} setState={setDataProduct} />
                <InputField label="Tên sản phẩm" name="name" required={true} value={dataProduct?.name} setState={setDataProduct} />
                <InputNumberField label="Giá" name="price" required={true} value={dataProduct?.price} setState={setDataProduct} configInputOptions={{ min: 0 }}
                    inputStyle={{
                        width: 200
                    }}
                />
                <SelectField label={
                    <div style={{ display: "flex", flexDirection: "column" }}><div>Kiểu mẫu</div><div style={{ cursor: "pointer" }}>
                        <Tooltip title={"Chạy lại"} placement="bottom"><TfiReload onClick={() => ModelQuery.refetch()} /></Tooltip></div></div>
                }
                    name="modelId"
                    setState={setDataProduct}
                    defaultValue={"Chọn kiểu mẫu"}
                    options={models?.map(item => {
                        return {
                            id: item.id || "",
                            name: item.name
                        }
                    })} />

                <Form.Item label="Mô tả" colon={false} labelCol={{ span: 2 }} wrapperCol={{ span: 20 }}>
                    <ModelEditor editorRef={editorRef} initialValue={dataProduct?.description} />
                </Form.Item>



                <Form.Item label={
                    <div style={{ display: "flex", flexDirection: "column" }}><div>Màu</div><div style={{ cursor: "pointer" }}>
                        <Tooltip title={"Chạy lại"} placement="bottom"><TfiReload onClick={() => refetchGetColor()} /></Tooltip></div></div>
                } colon={false} >
                    {productType?.id &&
                        <AddColorComponent prodType={productType} />
                    }
                    <Select defaultValue={"Chọn màu"} onChange={(val: string) => AddColorProp(val)}>
                        {Colors?.values?.map((item: any) => <Select.Option value={item.id} key={item.id}>{item.value}</Select.Option>)}
                    </Select>
                </Form.Item >

                <Table
                    // scroll={{ y: 'calc(100vh - 100px)' }}
                    pagination={false}
                    columns={columns}
                    dataSource={listProp}
                />
                <SubmitBtn text="Lưu" loading={isLoading} buttonStyle={{
                    marginTop: 30
                }} />
            </Form>
        </FormLayoutV1 >
    </>
}