import React, { useEffect, useState } from "react"
import { Form, Button } from "antd"
import { FormLayoutV1 } from "../../../components/formLayouts/FormLayoutV1";
import { useNavigate, useParams } from "react-router-dom";
import { FormType } from "../../../router/Index";
import { InputField, SelectField } from "../../../components/formInputs/CoreFormFields";
import { TypeModelFull, useGetTypesQuery } from "../../../redux/apiSlicers/ProductType";
import { notifyError } from "../../../utils/alert";
import { useQuery } from "../../../utils/queryParams";
import { PropertyModelForm, PropertyValue, useAddPropertyMutation, useGetPropertyByIdQuery, useGetPropertysQuery, useUpdatePropertyMutation } from "../../../redux/apiSlicers/Property";
import SizeTags from "./TagsForCoreProps";

type params = {
    propertyId: string
}

function initialFormValue() {
    return {
        name: "",
        productType: {
            id: "",
            name: ""
        },
        productTypeId: "",
        values: []
    }
}

const PropertyForm: React.FC<FormType> = ({ newForm }) => {
    const navigate = useNavigate();
    let query = useQuery()
    const [specForm, setSpecForm] = useState<boolean>(true)
    const [list, setList] = useState<string[]>([])

    const { propertyId } = useParams<keyof params>() as params;
    const [dataProperty, setDataProperty] = useState<PropertyModelForm>(initialFormValue());

    const getArgs = useGetPropertyByIdQuery(propertyId, {
        skip: !propertyId
    })
    const getProductTypeArgs = useGetTypesQuery()
    const [updateProperty, updateArgs] = useUpdatePropertyMutation()
    const [addProperty, addArgs] = useAddPropertyMutation()

    const handleFinish = () => {
        if (dataProperty.productTypeId == null) {
            notifyError("Product Type field is required")
            return
        }
        const dataSubmit = {
            ...dataProperty,
            values: list.map(item => { return { value: item } })
        }

        if (specForm && ["color", "size"].includes(dataSubmit.name.toLowerCase())) {
            notifyError("Specification property don't include Color and Size")
            return
        }

        newForm ? addProperty(dataSubmit) : updateProperty(dataSubmit)
        console.log(dataSubmit)
    }

    useEffect(() => {
        if (!newForm) {
            if (getArgs.data?.name) {
                setDataProperty(getArgs.data)
                !specForm && setList(getArgs.data.values.map(item => item.value.toString()))
            }
            getArgs.isError && navigate("/")
            updateArgs.isSuccess && navigate("/property")
        } else {
            if (addArgs.isSuccess) {
                setDataProperty({ ...initialFormValue(), productTypeId: dataProperty.productTypeId, name: dataProperty.name })
                setList([])
            }
        }
    }, [addArgs.isSuccess, updateArgs.isSuccess, getArgs.isError, getArgs.isSuccess, specForm])

    useEffect(() => {
        query.get("name") === 'core' && setSpecForm(false)
    }, [])

    return <FormLayoutV1
        styleWrapper={{
            maxWidth: "1000px"
        }}
        title={newForm ? (!specForm ? "Create New Core Property" : "Create New Specification Property") : (!specForm ? "Edit Core Property" : "Edit Specification Property")}>
        <Form
            labelCol={{ span: 3 }}
            labelWrap
            wrapperCol={{ span: 21 }}
            layout="horizontal"
            onFinish={handleFinish}
        >
            {
                specForm ?
                    <InputField
                        label="Property name"
                        name="name"
                        required={true}
                        value={dataProperty?.name}
                        setState={setDataProperty}
                    /> :
                    <SelectField label="Tên thuộc tính" name="name" required={true}
                        setState={setDataProperty}
                        defaultValue={"Chọn thuộc tính"}
                        options={["color", "size"].map((item: string) => {
                            return {
                                id: item,
                                name: item
                            }
                        })} />
            }


            <SelectField label="Loại sản phẩm" name="productTypeId" required={true}
                setState={setDataProperty}
                defaultValue={!newForm ? dataProperty.productType.name : "Chọn phân loại sản phẩm"}
                options={getProductTypeArgs.data?.map((item: TypeModelFull) => {
                    return {
                        id: item.id,
                        name: item.name
                    }
                })} />
            {
                !specForm &&
                <Form.Item label="Giá trị">
                    <SizeTags tags={list} setTags={setList} />
                </Form.Item>
            }

            <div style={{ textAlign: "center", margin: "0 auto" }} >
                <Button type="primary" htmlType="submit" loading={newForm ? addArgs.isLoading : updateArgs.isLoading}>
                    {newForm ? "Tạo mới" : "Lưu thay đổi"}
                </Button>
            </div>
        </Form>
    </FormLayoutV1>
}

export default PropertyForm;



// const PropertyForm: React.FC<{ new: boolean }> = (props) => {
//     let query = useQuery()
//     const [specForm, setSpecForm] = useState<boolean>(true)
//     const [list, setList] = useState<string[]>([])
//     useEffect(() => {
//         query.get("name") === 'core' && setSpecForm(false)
//     }, [])



//     if (props.new) {
//         return <FormLayoutV1 title={!specForm ? "Create New Core Property" : "Create New Specification Property"}>
//             {
//                 !specForm ?
//                     <Form
//                         labelCol={{ span: 5 }}
//                         wrapperCol={{ span: 13 }}
//                         layout="horizontal"
//                     >
//                         <Form.Item label="Name">
//                             <Select>
//                                 {["Color", "Size"].map(item => <Select.Option value={item}>{item}</Select.Option>)}
//                             </Select>
//                         </Form.Item>
//                         <Form.Item label="Product Type">
//                             <Select>
//                                 {dataType.map(item => <Select.Option value={item.name}>{item.name}</Select.Option>)}
//                             </Select>
//                         </Form.Item>
//                         <Form.Item label="Values">
//                             <SizeTags tags={list} setTags={setList} />
//                         </Form.Item>


//                         <Form.Item style={{ textAlign: "center" }} colon={false}>
//                             <Button type="primary" htmlType="submit">
//                                 Submit
//                             </Button>
//                         </Form.Item>

//                     </Form>
//                     :
//                     <Form
//                         labelCol={{ span: 5 }}
//                         wrapperCol={{ span: 13 }}
//                         layout="horizontal"
//                     >
//                         <Form.Item label="Name">
//                             <Input />
//                         </Form.Item>
//                         <Form.Item label="Product Type">
//                             <Select>
//                                 {dataType.map(item => <Select.Option value={item.name}>{item.name}</Select.Option>)}
//                             </Select>
//                         </Form.Item>
//                         <Form.Item style={{ textAlign: "center" }} colon={false}>
//                             <Button type="primary" htmlType="submit">
//                                 Submit
//                             </Button>
//                         </Form.Item>

//                     </Form>
//             }
//         </FormLayoutV1>

//     } else {
//         return <FormLayoutV1 title={!specForm ? "Edit Core Property" : "Edit Specification Property"}>
//             {
//                 !specForm ?
//                     <Form
//                         labelCol={{ span: 5 }}
//                         wrapperCol={{ span: 13 }}
//                         layout="horizontal"
//                     >
//                         <Form.Item label="Name">
//                             <Select>
//                                 {["Color", "Size"].map(item => <Select.Option value={item}>{item}</Select.Option>)}
//                             </Select>
//                         </Form.Item>
//                         <Form.Item label="Product Type">
//                             <Select>
//                                 {dataType.map(item => <Select.Option value={item.name}>{item.name}</Select.Option>)}
//                             </Select>
//                         </Form.Item>
//                         <Form.Item label="Values">
//                             <SizeTags tags={list} setTags={setList} />
//                         </Form.Item>


//                         <Form.Item style={{ textAlign: "center" }} colon={false}>
//                             <Button type="primary" htmlType="submit">
//                                 Submit
//                             </Button>
//                         </Form.Item>

//                     </Form>
//                     :
//                     <Form
//                         labelCol={{ span: 5 }}
//                         wrapperCol={{ span: 13 }}
//                         layout="horizontal"
//                     >
//                         <Form.Item label="Name">
//                             <Input />
//                         </Form.Item>
//                         <Form.Item label="Product Type">
//                             <Select>
//                                 {dataType.map(item => <Select.Option value={item.name}>{item.name}</Select.Option>)}
//                             </Select>
//                         </Form.Item>
//                         <Form.Item style={{ textAlign: "center" }} colon={false}>
//                             <Button type="primary" htmlType="submit">
//                                 Save changes
//                             </Button>
//                         </Form.Item>

//                     </Form>
//             }
//         </FormLayoutV1>
//     }

// }
