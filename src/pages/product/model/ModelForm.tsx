import React, { useEffect, useState, useRef } from "react"
import { Form, Button } from "antd"
import { FormLayoutV1 } from "../../../components/formLayouts/FormLayoutV1";
import { useNavigate, useParams } from "react-router-dom";
import { BrandModelForm, BrandModelFull, useAddBrandMutation, useGetBrandByIdQuery, useGetBrandsQuery, useUpdateBrandMutation } from "../../../redux/apiSlicers/Brand";
import { FormType } from "../../../router/Index";
import { InputField, SelectField } from "../../../components/formInputs/CoreFormFields";
import ModelEditor from "../../../components/editors/ModelEditor";
import { ModelModelForm, ModelModelFull, useAddModelMutation, useGetModelByIdQuery, useUpdateModelMutation } from "../../../redux/apiSlicers/Model";
import { TypeModelForm, TypeModelFull, useGetTypesQuery } from "../../../redux/apiSlicers/ProductType";
import { Editor as TinyMCEEditor } from 'tinymce';
import { notifyError } from "../../../utils/alert";

type params = {
    modelId: string
}

function initialFormValue() {
    return {
        name: "",
        description: "",
        brand: {
            id: "",
            name: ""
        },
        productType: {
            id: "",
            name: ""
        },
        productTypeId: "",
        brandId: ""
    }
}

const BrandForm: React.FC<FormType> = ({ newForm }) => {
    const navigate = useNavigate();
    const { modelId } = useParams<keyof params>() as params;
    const editorRef = useRef<TinyMCEEditor | null>(null);
    const [dataModel, setDataModel] = useState<ModelModelForm>(initialFormValue());

    const getArgs = useGetModelByIdQuery(modelId, {
        skip: !modelId
    })
    const getBrandArgs = useGetBrandsQuery()
    const getProductTypeArgs = useGetTypesQuery()
    const [updateModel, updateArgs] = useUpdateModelMutation()
    const [addModel, addArgs] = useAddModelMutation()

    const handleFinish = () => {
        if (!dataModel.productTypeId) {
            return notifyError("Product Type field is required")
        }

        const dataForm = { ...dataModel, description: editorRef.current?.getContent() }
        console.log(dataForm)
        newForm ? addModel(dataForm) : updateModel(dataForm)
    }

    useEffect(() => {
        if (!newForm) {
            getArgs.data?.name && setDataModel(getArgs.data)
            getArgs.isError && navigate("/")
            updateArgs.isSuccess && navigate("/model")
        } else {
            if (addArgs.isSuccess) {
                setDataModel({ ...initialFormValue(), productTypeId: dataModel.productTypeId, brandId: dataModel.brandId })
                editorRef.current?.setContent("")
            }
        }
    }, [addArgs.isSuccess, updateArgs.isSuccess, getArgs.isError, getArgs.isSuccess])

    return <FormLayoutV1
        styleWrapper={{
            maxWidth: "1000px"
        }}
        title={newForm ? "Tạo Kiểu Mẫu Mới" : "Chỉnh Sửa Kiểu Mẫu"}>
        <Form
            labelCol={{ span: 3 }}
            labelWrap
            wrapperCol={{ span: 21 }}
            layout="horizontal"
            onFinish={handleFinish}
        >
            <InputField
                label="Tên kiểu mẫu"
                name="name"
                required={true}
                value={dataModel?.name}
                setState={setDataModel}
            />
            <Form.Item label="Mô tả" name="description" colon={false}>
                <ModelEditor editorRef={editorRef} initialValue={dataModel.description} />
            </Form.Item>

            <SelectField label="Thương Hiệu" name="brandId" required={true}
                setState={setDataModel}
                defaultValue={!newForm ? dataModel.brand.name : "Chọn thương hiệu"}
                options={getBrandArgs.data?.map((item: BrandModelFull) => {
                    return {
                        id: item.id,
                        name: item.name
                    }
                })} />


            <SelectField label="Loại sản phẩm" name="productTypeId" required={true}
                setState={setDataModel}
                defaultValue={!newForm ? dataModel.productType.name : "Chọn phân loại sản phẩm"}
                options={getProductTypeArgs.data?.map((item: TypeModelFull) => {
                    return {
                        id: item.id,
                        name: item.name
                    }
                })} />

            <div style={{ textAlign: "center", margin: "0 auto" }} >
                <Button type="primary" htmlType="submit" loading={newForm ? addArgs.isLoading : updateArgs.isLoading}>
                    {newForm ? "Tạo mới" : "Lưu thay đổi"}
                </Button>
            </div>
        </Form>
    </FormLayoutV1>
}

export default BrandForm;