import React, { useEffect, useState, useRef } from "react"
import { Form, Input, Button, Select, Tooltip, Row, Col, Table, Modal, InputNumber, Divider } from "antd"
import { TfiReload } from "react-icons/tfi"
import { TypeType } from "../../../utils/propsDummy/BrandProps";
import SizeBoxes from "./CheckBoxesForSize";
import { useQuery } from "../../../utils/queryParams";
import { useNavigate, useParams } from "react-router-dom";
import { InputField, InputNumberField, SelectField, SubmitBtn } from "../../../components/formInputs/CoreFormFields";
import { FormLayoutV1 } from "../../../components/formLayouts/FormLayoutV1";
import { ImageUploaderInput, InputSizeField } from "../../../components/formInputs/CustomFormFields";
import { PlusCircleOutlined } from '@ant-design/icons';
import { PopupAddColorModal, PopupAddSizeModal } from "../../../components/modals/PopupAddModal";
import { TypeModelFull, useGetTypesQuery } from "../../../redux/apiSlicers/ProductType";
import { PropertyModelFull, PropertyValue, useGetPropertysQuery } from "../../../redux/apiSlicers/Property";
import { IPropList, ISizeProp, ProductModelForm, useGetProductBySkuQuery, useUpdateProductMutation } from "../../../redux/apiSlicers/Product";
import { ColumnsType } from "antd/lib/table";
import { Deletebtn } from "../../../components/buttons/Deletebtn";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-hot-toast";
import { Viewbtn } from "../../../components/buttons/Viewbtn";
import { Editor as TinyMCEEditor } from 'tinymce';
import ModelEditor from "../../../components/editors/ModelEditor";


interface AddColorComponentType {
    prodType: TypeType
}
interface AddSizeComponentType {
    prodType: TypeType
}

const AddColorComponent: React.FC<AddColorComponentType> = ({ prodType }) => {
    const [open, setOpen] = useState(false)

    return <>
        <Tooltip title="Add new color"><PlusCircleOutlined style={{ cursor: "pointer" }} onClick={() => setOpen(true)} /></Tooltip>
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
        <Tooltip title="Add new Size"><PlusCircleOutlined style={{ cursor: "pointer" }} onClick={() => setOpen(true)} /></Tooltip>
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
    SizeInput: (propertyValueId: string) => JSX.Element
}
function ModalPropertyQuantity({ propertyValueId, listProp, setListProp, sizes, allSizes, setSizes, SizeInput }: IModalPropertyQuantity) {
    const [isModalOpenLevel1, setIsModalOpenLevel1] = useState(false);
    let item = listProp.find(i => i.propertyValueId === propertyValueId)
    console.log(item)

    const handleSubmit = () => {
        console.log(sizes)
        setListProp((prev: IPropList[]) => {
            return prev.map(i => {
                if (i.propertyValueId === propertyValueId) {
                    return {
                        ...i,
                        sizes: sizes.map(({ id, value, isNew }) => {
                            console.log(i.sizes)
                            return {
                                propertyValueId: id as string,
                                propertyValue: value,
                                quantity: i.sizes.find(i => i.propertyValueId === id)?.quantity || 0,
                                isNew: isNew
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
            onCancel={() => {
                setSizes([])
                setListProp(prev => prev)
                setIsModalOpenLevel1(false)
            }}>
            {SizeInput(propertyValueId)}
        </Modal>
    </>
}

type params = {
    sku: string
}

export const ProductFormEdit: React.FC = () => {
    const { sku } = useParams<keyof params>() as params;
    const query = useQuery()
    const navigate = useNavigate()
    const ProductTypeQuery = useGetTypesQuery()

    const { data, isSuccess: fetchProductSuccess } = useGetProductBySkuQuery(sku, {
        skip: !sku
    })
    const [updateProduct, { isLoading, isSuccess: updateSuccess }] = useUpdateProductMutation()

    const [productType, setProductType] = useState<TypeType | null>()
    const getSizes = useGetPropertysQuery().data?.find(i => i.name === "size" && i.productType.id === productType?.id) //find(i => i.values.length > 0)?.values//.values
    const { data: Colors, refetch: refetchGetColor } = useGetPropertysQuery(undefined, {
        selectFromResult: ({ data }) => {
            return {
                data: data?.find(i => i.name === "color" && i.productType.id === productType?.id)
            }
        },
        skip: !productType
    })
    const [sizes, setSizes] = useState<PropertyValue[]>([])
    const [dataProduct, setDataProduct] = useState<ProductModelForm>(initialFormValue());
    const [listProp, setListProp] = useState<IPropList[]>([])
    const editorRef = useRef<TinyMCEEditor | null>(null);


    function SizeInput(propertyValueId: String) {

        return <InputSizeField>
            {
                getSizes ?
                    <SizeBoxes sizes={getSizes.values} selectedSizes={sizes} setSizes={setSizes}
                        editForm={true}
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


    const handleFinish = (values: any) => {
        console.log("*********************")
        console.log({ ...dataProduct, values: listProp, storeId: dataProduct?.store?.id, modelId: dataProduct?.model?.id })
        updateProduct(
            { ...dataProduct, values: listProp, storeId: dataProduct?.store?.id, modelId: dataProduct?.model?.id, description: editorRef.current?.getContent() }
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
                <p>Kích thước: Số lượng</p>
                <p>Giá giảm: Giá cần giảm</p>
            </>,
            dataIndex: 'sizes',
            key: 'sizes',
            render: (value: ISizeProp[], record: IPropList) => {
                console.log(value)
                const handleChangeQuanity = (val: number, propertyValueId: string, propertyValue: string | undefined) => {
                    setListProp(prev => {
                        return prev.map(i => {
                            if (i.propertyValueId === record.propertyValueId) {
                                return {
                                    ...i,
                                    sizes: i["sizes"].map(i => {
                                        if (i.propertyValueId === propertyValueId) {
                                            return {
                                                ...i,
                                                quantity: val,
                                                propertyValue: propertyValue
                                            }
                                        }
                                        return i
                                    }) as ISizeProp[]
                                }
                            }
                            return i
                        })
                    })
                }
                const handleChangePrice = (val: number, propertyValueId: string, propertyValue: string | undefined) => {
                    setListProp(prev => {
                        return prev.map(i => {
                            if (i.propertyValueId === record.propertyValueId) {
                                return {
                                    ...i,
                                    sizes: i["sizes"].map(i => {
                                        if (i.propertyValueId === propertyValueId) {
                                            return {
                                                ...i,
                                                discountPrice: val,
                                                propertyValue: propertyValue
                                            }
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
                            return (
                                <Col span={8} key={i}>
                                    <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}
                                        style={{ marginBottom: 7 }}
                                        label={getSizes?.values.find(i => i.id === item.propertyValueId)?.value}
                                    >
                                        <InputNumber min={0} value={item.quantity}
                                            onChange={val => handleChangeQuanity(val as number, item.propertyValueId, item.propertyValue)}
                                        />
                                    </Form.Item>
                                    <Form.Item label="Giá giảm" labelCol={{ span: 10 }} wrapperCol={{ span: 14 }}>
                                        <InputNumber min={0}
                                            max={100000000}
                                            value={item.discountPrice ? item.discountPrice : 0}
                                            style={{ width: "100%" }}
                                            onChange={val => handleChangePrice(val as number, item.propertyValueId, item.propertyValue)}
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        // parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
                                        />
                                    </Form.Item>
                                    <Divider />
                                </Col>
                            )
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
                        multipleAllow={true} setState={setListProp} name="images" propertyValueId={record.propertyValueId} value={record.images} />
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
                    {
                        record.attributeCode ? <Viewbtn
                            text='Xóa'
                            action={() => toast.error("Không thể xóa màu đã được tạo!!")}
                        />
                            :
                            <Deletebtn text='Xóa' action={() => {
                                setListProp(prev => {
                                    return prev.filter(i => i.propertyValueId !== record.propertyValueId)
                                })
                            }} />
                    }
                </>
            },
            width: "10%",
        },
    ]

    useEffect(() => {
        const producTypeID = query.get("type")
        if (producTypeID) {
            const resultProductType = ProductTypeQuery.data?.find((item: TypeModelFull) => item.id === producTypeID)
            resultProductType ? setProductType(resultProductType) : navigate("/product")
            // getSizes && setSizes(getSizes.values)
        }
    }, [productType, getSizes])

    useEffect(() => {
        if (fetchProductSuccess) {
            setDataProduct(data)
            setListProp(data.values)
        }
    }, [fetchProductSuccess])

    useEffect(() => {
        if (updateSuccess) {
            navigate("/product")
        }
    }, [updateSuccess])


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
            title={`Sửa Sản Phẩm - Phân Loại ${productType?.name}`}
            styleWrapper={{ maxWidth: "100%", backgroundColor: "white", padding: "20px 0 20px 10px" }}
        >
            <Form
                labelCol={{ span: 2 }}
                wrapperCol={{ span: 15 }}
                layout="horizontal"
                onFinish={handleFinish}
            >
                <InputField disabled label="Cửa hàng" name="storeId" required={true} value={dataProduct?.store?.name} setState={setDataProduct} />
                <InputField disabled label="SKU" name="sku" required={true} value={dataProduct?.sku} setState={setDataProduct} />
                <InputField label="Tên sản phẩm" name="name" required={true} value={dataProduct?.name} setState={setDataProduct} />
                <InputNumberField label="Giá" name="price" required={true} value={dataProduct?.price} setState={setDataProduct} configInputOptions={{ min: 0 }}
                    inputStyle={{
                        width: 200
                    }}
                />
                <InputField disabled label="Kiểu mẫu" name="model" required={true} value={dataProduct?.model?.name} setState={setDataProduct} />
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
                    <Select
                        showSearch
                        optionFilterProp="children"
                        defaultValue={"Chọn màu"} onChange={(val: string) => AddColorProp(val)}>
                        {Colors?.values?.map((item: any) => <Select.Option value={item.id} key={item.id}>{item.value}</Select.Option>)}
                    </Select>
                </Form.Item >
                <Table
                    // scroll={{ y: 'calc(100vh - 100px)' }}
                    columns={columns}
                    dataSource={listProp}
                    pagination={false}
                />
                <SubmitBtn text="Lưu Thay Đổi" loading={isLoading} buttonStyle={{
                    marginTop: 30
                }} />
            </Form>
        </FormLayoutV1 >
    </>
}