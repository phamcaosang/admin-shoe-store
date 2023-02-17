import React, { useEffect, useState } from "react"
import { Form, Button } from "antd"
import { FormLayoutV1 } from "../../../components/formLayouts/FormLayoutV1";
import { useNavigate, useParams } from "react-router-dom";
import { FormType } from "../../../router/Index";
import { InputField, TextAreaField } from "../../../components/formInputs/CoreFormFields";
import { TypeModelForm, useAddTypeMutation, useGetTypeByIdQuery, useUpdateTypeMutation } from "../../../redux/apiSlicers/ProductType";
import { ImageUploaderInput } from "../../../components/formInputs/CustomFormFields";


type params = {
    typeId: string
}

function initialFormValue() {
    return {
        name: "",
        description: "",
        image: undefined
    }
}

const TypeForm: React.FC<FormType> = ({ newForm }) => {
    const navigate = useNavigate();
    const { typeId } = useParams<keyof params>() as params;
    const [dataType, setDataType] = useState<TypeModelForm>(initialFormValue());

    const getArgs = useGetTypeByIdQuery(typeId, {
        skip: !typeId
    })
    const [updateType, { ...updateArgs }] = useUpdateTypeMutation()
    const [addType, { ...addArgs }] = useAddTypeMutation()

    const handleFinish = () => {
        newForm ? addType(dataType) : updateType(dataType)
    }
    console.log(dataType)

    useEffect(() => {
        if (!newForm) {
            getArgs.data?.name && setDataType(getArgs.data)
            getArgs.isError && navigate("/")
            updateArgs.isSuccess && navigate("/type")
        } else {
            if (addArgs.isSuccess) {
                setDataType(initialFormValue())
            }
        }
    }, [addArgs.isSuccess, updateArgs.isSuccess, getArgs.isError, getArgs.isSuccess])

    return <FormLayoutV1 title={newForm ? "Tạo Phân Loại Sản Phẩm Mới" : "Chỉnh Sửa Phân Loại Sản Phẩm"}>
        <Form
            labelCol={{ span: 5 }}
            labelWrap
            wrapperCol={{ span: 19 }}
            layout="horizontal"
            onFinish={handleFinish}
        >
            <InputField
                label="Tên phân loại"
                name="name"
                required={true}
                value={dataType?.name}
                setState={setDataType}
            />
            <ImageUploaderInput label="Hình ảnh" multipleAllow={false}
                value={dataType?.image}
                setState={setDataType}
            />
            <TextAreaField
                label="Mô tả"
                name="description"
                value={dataType?.description}
                setState={setDataType}
                rows={4}
            />
            <div style={{ textAlign: "center", margin: "0 auto" }}>
                <Button type="primary" htmlType="submit" loading={newForm ? addArgs.isLoading : updateArgs.isLoading}>
                    {newForm ? "Tạo mới" : "Lưu thay đổi"}

                </Button>
            </div>
        </Form>
    </FormLayoutV1>
}

export default TypeForm;