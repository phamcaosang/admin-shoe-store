import React, { useEffect, useState } from "react"
import { Form, Button } from "antd"
import { FormLayoutV1 } from "../../../components/formLayouts/FormLayoutV1";
import { useNavigate, useParams } from "react-router-dom";
import { FormType } from "../../../router/Index";
import { InputField, TextAreaField } from "../../../components/formInputs/CoreFormFields";
import { ImageUploaderInput } from "../../../components/formInputs/CustomFormFields";
import { CollectModelForm, useAddCollectionMutation, useGetCollectionByIdQuery, useUpdateCollectionMutation } from "../../../redux/apiSlicers/Collection";
import { ProductSelection } from "./ProductSelection";


type params = {
    collectionId: string
}

function initialFormValue() {
    return {
        name: "",
        description: "",
        image: undefined,
        products: [] as {
            sku: string,
            name: string
        }[],
        skus: [] as string[]
    }
}

const CollectionForm: React.FC<FormType> = ({ newForm }) => {
    const navigate = useNavigate();
    const { collectionId } = useParams<keyof params>() as params;
    const [dataCollection, setDataCollection] = useState<CollectModelForm>(initialFormValue());

    const getArgs = useGetCollectionByIdQuery(collectionId, {
        skip: !collectionId
    })
    const [updateCollection, { ...updateArgs }] = useUpdateCollectionMutation()
    const [addCollection, { ...addArgs }] = useAddCollectionMutation()

    const handleFinish = () => {
        console.log(dataCollection)
        newForm ? addCollection(dataCollection) : updateCollection(dataCollection)
    }

    useEffect(() => {
        if (!newForm) {
            getArgs.data?.name && setDataCollection(getArgs.data)
            getArgs.isError && navigate("/")
            updateArgs.isSuccess && navigate("/collection")
        } else {
            if (addArgs.isSuccess) {
                setDataCollection(initialFormValue())
            }
        }
    }, [addArgs.isSuccess, updateArgs.isSuccess, getArgs.isError, getArgs.isSuccess])

    console.log(dataCollection);


    return <FormLayoutV1 title={newForm ? "Tạo Bộ Sưu Tập Mới" : "Chỉnh Sửa Bộ Sưu Tập"} styleWrapper={{ maxWidth: "100%" }}>
        <Form
            labelCol={{ span: 5 }}
            labelWrap
            wrapperCol={{ span: 15 }}
            layout="horizontal"
            onFinish={handleFinish}
        >
            <InputField
                label="Tên bộ sưu tập"
                name="name"
                required={true}
                value={dataCollection?.name}
                setState={setDataCollection}
            />
            <ImageUploaderInput label="Hình ảnh" multipleAllow={false}
                value={dataCollection?.image}
                setState={setDataCollection}
            />
            <TextAreaField
                label="Mô tả"
                name="description"
                value={dataCollection?.description}
                setState={setDataCollection}
                rows={4}
            />
            <ProductSelection setState={setDataCollection} name="skus" initKeys={dataCollection?.products} />

            <div style={{ textAlign: "center", margin: "20px auto 0 auto" }}>
                <Button type="primary" htmlType="submit" loading={newForm ? addArgs.isLoading : updateArgs.isLoading}>
                    {newForm ? "Tạo mới" : "Lưu thay đổi"}
                </Button>
            </div>
        </Form>
    </FormLayoutV1>
}




export default CollectionForm;