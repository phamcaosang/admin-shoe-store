import React, { useEffect, useState } from "react"
import { Form, Button } from "antd"
import { FormLayoutV1 } from "../../../components/formLayouts/FormLayoutV1";
import { useNavigate, useParams } from "react-router-dom";
import { BrandModelForm, useAddBrandMutation, useGetBrandByIdQuery, useUpdateBrandMutation } from "../../../redux/apiSlicers/Brand";
import { FormType } from "../../../router/Index";
import { InputField, TextAreaField } from "../../../components/formInputs/CoreFormFields";
import { ImageUploaderInput } from "../../../components/formInputs/CustomFormFields";


type params = {
  brandId: string
}

function initialFormValue() {
  return {
    name: "",
    description: "",
    image: undefined
  }
}

const BrandForm: React.FC<FormType> = ({ newForm }) => {
  const navigate = useNavigate();
  const { brandId } = useParams<keyof params>() as params;
  const [dataBrand, setDataBrand] = useState<BrandModelForm>(initialFormValue());
  console.log(dataBrand)

  const getArgs = useGetBrandByIdQuery(brandId, {
    skip: !brandId
  })
  const [updateBrand, { ...updateArgs }] = useUpdateBrandMutation()
  const [addBrand, { ...addArgs }] = useAddBrandMutation()

  const handleFinish = () => {
    newForm ? addBrand(dataBrand) : updateBrand(dataBrand)
  }

  useEffect(() => {
    if (!newForm) {
      getArgs.data?.name && setDataBrand(getArgs.data)
      getArgs.isError && navigate("/")
      updateArgs.isSuccess && navigate("/brand")
    } else {
      addArgs.isSuccess && setDataBrand(initialFormValue())
    }
  }, [addArgs.isSuccess, updateArgs.isSuccess, getArgs.isError, getArgs.isSuccess])


  return <FormLayoutV1 title={newForm ? "Tạo Thương Hiệu Mới" : "Chỉnh Sửa Thương Hiệu"}>
    <Form
      labelCol={{ span: 5 }}
      labelWrap
      wrapperCol={{ span: 19 }}
      layout="horizontal"
      onFinish={handleFinish}
    >
      <InputField
        label="Tên thương hiệu"
        name="name"
        required={true}
        value={dataBrand?.name}
        setState={setDataBrand}
      />
      {/* <ImageUploaderInput label="Hình ảnh" multipleAllow={false}
        value={dataBrand?.image}
        setState={setDataBrand}
      /> */}
      <TextAreaField
        label="Mô tả"
        name="description"
        value={dataBrand?.description}
        setState={setDataBrand}
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

export default BrandForm;