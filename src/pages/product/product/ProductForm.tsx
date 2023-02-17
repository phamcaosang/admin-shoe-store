export default function ProductForm() {
    return <>
    </>
}

// import React, { useEffect, useState } from "react"
// import { Form, Input, Button, Select, Tooltip, Row, Col, Table, Modal } from "antd"
// import { dataType, TypeType } from "../../../utils/propsDummy/BrandProps";
// import SizeBoxes from "./CheckBoxesForSize";
// import { useQuery } from "../../../utils/queryParams";
// import { useNavigate, useParams } from "react-router-dom";
// import { InputField, InputNumberField, SelectField, SubmitBtn } from "../../../components/formInputs/CoreFormFields";
// import { FormLayoutV1 } from "../../../components/formLayouts/FormLayoutV1";
// import { AddSpecPropComponent, DynamicAddFormSpecProp, ImageUploaderInput, InputSizeField } from "../../../components/formInputs/CustomFormFields";
// import { PlusCircleOutlined } from '@ant-design/icons';
// import { PopupAddColorModal, PopupAddSizeModal } from "../../../components/modals/PopupAddModal";
// import { TypeModelFull, useGetTypesQuery } from "../../../redux/apiSlicers/ProductType";
// import { PropertyValue, useGetPropertyByIdQuery, useGetPropertysQuery } from "../../../redux/apiSlicers/Property";
// import { ProductModelForm, useAddProductMutation, useGetProductByIdQuery, useUpdateProductMutation } from "../../../redux/apiSlicers/Product";
// import { ModelModelForm, ModelModelFull, useGetModelsQuery } from "../../../redux/apiSlicers/Model";
// import { FormType } from "../../../router/Index";
// import { skipToken } from '@reduxjs/toolkit/query/react'
// import { ColumnsType } from "antd/lib/table";
// import { Deletebtn } from "../../../components/buttons/Deletebtn";




// interface AddColorComponentType {
//     prodType: TypeType
// }
// interface AddSizeComponentType {
//     prodType: TypeType
// }

// const AddColorComponent: React.FC<AddColorComponentType> = ({ prodType }) => {
//     const [open, setOpen] = useState(false)

//     return <>
//         <Tooltip title="Add new color"><PlusCircleOutlined style={{ cursor: "pointer" }} onClick={() => setOpen(true)} /></Tooltip>
//         <PopupAddColorModal
//             title={`Thêm màu mới cho ${prodType.name}`}
//             open={open}
//             setOpen={setOpen}
//             onCancel={() => setOpen(false)}
//             productType={prodType}
//         />
//     </>
// }

// const AddSizeComponent: React.FC<AddSizeComponentType> = ({ prodType }) => {
//     const [open, setOpen] = useState(false)

//     return <>
//         <Tooltip title="Add new Size"><PlusCircleOutlined style={{ cursor: "pointer" }} onClick={() => setOpen(true)} /></Tooltip>
//         <PopupAddSizeModal
//             title={`Thêm size mới cho ${prodType.name}`}
//             open={open}
//             setOpen={setOpen}
//             onCancel={() => setOpen(false)}
//             productType={prodType}
//         />
//     </>
// }

// function initialFormValue() {
//     return {
//         sku: "",
//         name: "",
//         modelId: "",
//         price: 0,
//         color: {
//             propertyId: "",
//             propertyValueId: ""
//         },
//         values: [] as {
//             propertyId: string,
//             propertyValueId: string
//         }[],
//         propsValues: [] as {
//             propertyId: string,
//             propertyName: string,
//             values: {
//                 propertyValueId: string,
//                 propertyValue: string,
//             }[]
//         }[],
//         quantity: 0,
//         images: [] as string[],
//     }
// }

// type params = {
//     productId: string
// }

// const ProductForm: React.FC<FormType> = ({ newForm }) => {
//     const { productId } = useParams<keyof params>() as params;
//     const getArgs = useGetProductByIdQuery(productId, {
//         skip: !productId
//     })

//     const [updateProduct, updateArgs] = useUpdateProductMutation()

//     const query = useQuery()
//     const navigate = useNavigate()
//     const [sizes, setSizes] = useState<PropertyValue[]>([])
//     const [dataProduct, setDataProduct] = useState<ProductModelForm>(initialFormValue());
//     const [productType, setProductType] = useState<TypeType | null>()
//     const [models, setModels] = useState<ModelModelFull[]>()
//     const ProductTypeQuery = useGetTypesQuery()
//     const ModelQuery = useGetModelsQuery()

//     const Colors = useGetPropertysQuery().data?.find(i => i.name === "color" && i.productType.id === productType?.id)
//     const getSizes = useGetPropertysQuery().data?.find(i => i.name === "size" && i.productType.id === productType?.id) //find(i => i.values.length > 0)?.values//.values

//     const [addProduct] = useAddProductMutation()
//     useEffect(() => {
//         const producTypeID = query.get("type")
//         if (producTypeID) {
//             const resultProductType = ProductTypeQuery.data?.find((item: TypeModelFull) => item.id === producTypeID)
//             const resutModels = ModelQuery.data?.filter((item: ModelModelFull) => item.productType.id === producTypeID)
//             setModels(resutModels)
//             resultProductType ? setProductType(resultProductType) : navigate("/product")
//             getSizes && setSizes(getSizes.values)
//         } else {
//             // navigate("/product")
//         }
//     }, [productType, getSizes])


//     useEffect(() => {
//         if (!newForm) {
//             if (getArgs.data?.sku) {
//                 setDataProduct(getArgs.data)
//             }
//             getArgs.isError && navigate("/")
//             updateArgs.isSuccess && navigate("/model")
//         } else {
//             // if (addArgs.isSuccess) {
//             //     setDataModel({ ...initialFormValue(), productTypeId: dataModel.productTypeId, brandId: dataModel.brandId })
//             //     editorRef.current?.setContent("")
//             // }
//         }

//     }, [getArgs.isSuccess, updateArgs.isSuccess, getArgs.isError])

//     interface ISizeProp {
//         propertyValueId: string,
//         quantity: number,
//         storeId: string
//     }

//     interface IPropList {
//         propertyValueId: string,
//         sizes: ISizeProp,
//         images: string[]
//     }

//     const [listProp, setListProp] = useState<IPropList[]>([])
//     console.log(listProp)

//     useEffect(() => {
//         const colorSelected = dataProduct.color.propertyValueId
//         if (!listProp?.map(i => i.propertyValueId).includes(colorSelected) && colorSelected) {
//             setListProp((prev: IPropList[]) => {
//                 return [
//                     ...prev,
//                     {
//                         propertyValueId: colorSelected,
//                         sizes: {} as ISizeProp,
//                         images: [] as string[]
//                     }
//                 ]
//             })
//         }

//     }, [dataProduct.color.propertyValueId])

//     const [isModalOpenLevel1, setIsModalOpenLevel1] = useState(false);
//     const [isModalOpenLevel2, setIsModalOpenLevel2] = useState(false);
//     const columns: ColumnsType<IPropList> = [
//         {
//             title: 'Màu sắc',
//             dataIndex: 'propertyValueId',
//             key: 'propertyValueId',
//             render: (value: string) => {
//                 return Colors?.values.find(i => i.id === value)?.value
//             },
//             width: "10%",
//         },
//         {
//             title: 'Kích thước - Số lượng - Cửa hàng',
//             dataIndex: 'quantities',
//             key: 'quantities',
//             render: (value: number) => {

//                 return <>
//                     <Button type="primary" onClick={() => setIsModalOpenLevel1(true)}>Thêm</Button>
//                     <Modal title="Chọn kích thước - size" open={isModalOpenLevel1}
//                         onOk={() => setIsModalOpenLevel2(true)}
//                         onCancel={() => setIsModalOpenLevel1(false)}>
//                         <InputSizeField>
//                             {
//                                 getSizes ?
//                                     <SizeBoxes sizes={getSizes.values} setSizes={setSizes} >
//                                         {productType?.id &&
//                                             <AddSizeComponent prodType={productType} />
//                                         }
//                                     </SizeBoxes>
//                                     :
//                                     <>
//                                         {productType?.id &&
//                                             <AddSizeComponent prodType={productType} />
//                                         }
//                                     </>
//                             }
//                         </InputSizeField>
//                     </Modal>
//                     <Modal title="Nhập số lượng và cửa hàng cho kích thước đã chọn"
//                         open={isModalOpenLevel2}
//                         onOk={() => {
//                             setIsModalOpenLevel1(false)
//                             setIsModalOpenLevel2(false)
//                         }}
//                         onCancel={() => setIsModalOpenLevel2(false)}>


//                     </Modal>
//                 </>
//             },
//             width: "40%",

//         },
//         {
//             title: 'Hình ảnh',
//             dataIndex: 'images',
//             key: 'images',
//             render: (value: string[]) => {
//                 return <ImageUploaderInput multipleAllow={true} setState={() => { }} />
//             },
//             width: "40%",
//         },
//         {
//             title: 'Hành động',
//             key: 'action',
//             render: (record: IPropList) => {
//                 return <>
//                     <Deletebtn text='Delete' action={() => { }} />
//                 </>
//             },
//             width: "10%",
//         },
//     ]


//     const handleFinish = () => {
//         addProduct(
//             {
//                 ...dataProduct,
//                 "values": [dataProduct.color, ...sizes.map(item => {
//                     return {
//                         propertyId: getSizes?.id,
//                         propertyValueId: item.id
//                     } as {
//                         propertyId: string,
//                         propertyValueId: string
//                     }
//                 })]
//             }
//         )

//     }

//     return <FormLayoutV1
//         title={newForm ? `Tạo Sản Phẩm Mới - ${productType?.name}` : "Chỉnh Sửa Sản Phẩm"}
//         styleWrapper={{ maxWidth: "100%", backgroundColor: "white", padding: "20px 0 20px 10px" }}
//     >
//         <Form
//             labelCol={{ span: 3 }}
//             wrapperCol={{ span: 15 }}
//             layout="horizontal"
//             onFinish={handleFinish}
//         >

//             <InputField label="SKU" name="sku" required={true} value={dataProduct?.sku} setState={setDataProduct} />
//             <InputField label="Tên sản phẩm" name="name" required={true} value={dataProduct?.name} setState={setDataProduct} />
//             <SelectField label="Kiểu mẫu" name="modelId"
//                 setState={setDataProduct}
//                 defaultValue={!newForm ? dataProduct.modelId : "Chọn kiểu mẫu"}

//                 options={models?.map(item => {
//                     return {
//                         id: item.id || "",
//                         name: item.name
//                     }
//                 })} />
//             <InputNumberField label="Giá" name="price" required={true} value={dataProduct?.price} setState={setDataProduct} configInputOptions={{ min: 0 }}
//                 inputStyle={{
//                     width: 200
//                 }}

//             />

//             {newForm ?
//                 <SelectField label="Màu" name="color"
//                     setState={setDataProduct}
//                     defaultValue={!newForm ? "Màu" : "Chọn màu"}

//                     propertyId={Colors?.id}


//                     options={Colors?.values?.map(item => {
//                         return {
//                             id: item.id || "",
//                             name: item.value
//                         }
//                     })
//                     }>
//                     {productType?.id &&
//                         <AddColorComponent prodType={productType} />
//                     }
//                 </SelectField>
//                 :
//                 <>
//                     <InputField label="Màu" name="color" required={true} value={dataProduct.propsValues && dataProduct.propsValues[1]?.values[0]?.propertyValue} setState={() => { }} disabled={true} />
//                 </>
//             }




//             <Table
//                 scroll={{ y: 'calc(100vh - 180px)' }}
//                 columns={columns}
//                 dataSource={listProp}
//             />



//             {/* <InputSizeField label="Kích thước">
//                 {
//                     getSizes ?
//                         <SizeBoxes sizes={getSizes.values} setSizes={setSizes} >
//                             {productType?.id &&
//                                 <AddSizeComponent prodType={productType} />
//                             }
//                         </SizeBoxes>
//                         :
//                         <>
//                             {productType?.id &&
//                                 <AddSizeComponent prodType={productType} />
//                             }
//                         </>
//                 }
//             </InputSizeField> */}

//             {/* <InputNumberField label="Số lượng" configInputOptions={{ min: 0 }}
//                 name="quantity" required={true} value={dataProduct?.quantity} setState={setDataProduct}
//             /> */}

//             {/* {dataStore.map((item, index) =>
//                             <InputNumberField
//                                 key={index}
//                                 label={<div>Quantity/<Tooltip title={item.name}>
//                                     <b>S-{index + 1}</b></Tooltip>
//                                 </div>}
//                                 configInputOptions={{
//                                     precision: 0,
//                                     defaultValue: 0,
//                                     step: 1,
//                                     max: 99,
//                                     min: 0
//                                 }}

//                             />
//                         )} */}

//             {/* <ImageUploaderInput label="Hình ảnh" multipleAllow={true} setState={setDataProduct} name="images" value={dataProduct?.images} /> */}

//             {/* <Form.Item label="Thông số kỹ thuật">
//                         <DynamicAddFormSpecProp prodType={productType?.name}>
//                             {productType?.id &&
//                                 <AddSpecPropComponent prodType={productType} />
//                             }
//                         </DynamicAddFormSpecProp>

//                     </Form.Item> */}
//             <SubmitBtn text="Submit" buttonStyle={{
//                 marginTop: 30
//             }} />
//         </Form>
//     </FormLayoutV1 >
// }

// export default ProductForm;

