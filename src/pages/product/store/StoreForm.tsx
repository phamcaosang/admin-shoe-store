import React, { useEffect, useState } from "react"
import { Form, Button } from "antd"
import { FormLayoutV1 } from "../../../components/formLayouts/FormLayoutV1";
import { useNavigate, useParams } from "react-router-dom";
import { BrandModelForm, useAddBrandMutation, useGetBrandByIdQuery, useUpdateBrandMutation } from "../../../redux/apiSlicers/Brand";
import { FormType } from "../../../router/Index";
import { InputField, TextAreaField } from "../../../components/formInputs/CoreFormFields";
import { StoreModelForm, useAddStoreMutation, useGetStoreByIdQuery, useUpdateStoreMutation } from "../../../redux/apiSlicers/Store";


type params = {
    storeId: string
}

function initialFormValue() {
    return {
        name: "",
        address: "",
        phone: ""
    }
}

const StoreForm: React.FC<FormType> = ({ newForm }) => {
    const navigate = useNavigate();
    const { storeId } = useParams<keyof params>() as params;
    const [dataStore, setDataStore] = useState<StoreModelForm>(initialFormValue());

    const getArgs = useGetStoreByIdQuery(storeId, {
        skip: !storeId
    })
    const [updateBrand, { ...updateArgs }] = useUpdateStoreMutation()
    const [addBrand, { ...addArgs }] = useAddStoreMutation()

    const handleFinish = () => {
        newForm ? addBrand(dataStore) : updateBrand(dataStore)
    }

    useEffect(() => {
        if (!newForm) {
            getArgs.data?.name && setDataStore(getArgs.data)
            getArgs.isError && navigate("/")
            updateArgs.isSuccess && navigate("/store")
        } else {
            addArgs.isSuccess && setDataStore(initialFormValue())
        }
    }, [addArgs.isSuccess, updateArgs.isSuccess, getArgs.isError, getArgs.isSuccess])

    return <FormLayoutV1 title={newForm ? "Create New Store" : "Edit Store"}>
        <Form
            labelCol={{ span: 5 }}
            labelWrap
            wrapperCol={{ span: 19 }}
            layout="horizontal"
            onFinish={handleFinish}
        >
            <InputField
                label="Store name"
                name="name"
                required={true}
                value={dataStore?.name}
                setState={setDataStore}
            />
            <InputField
                label="Address"
                name="address"
                required={true}
                value={dataStore?.address}
                setState={setDataStore}
            />
            <InputField
                label="Phone"
                name="phone"
                required={true}
                value={dataStore?.phone}
                setState={setDataStore}
            />
            <div style={{ textAlign: "center", margin: "0 auto" }}>
                <Button type="primary" htmlType="submit" loading={newForm ? addArgs.isLoading : updateArgs.isLoading}>
                    {newForm ? "Tạo mới" : "Lưu thay đổi"}

                </Button>
            </div>
        </Form>
    </FormLayoutV1>
}

export default StoreForm;