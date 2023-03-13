import { useNavigate, useParams } from 'react-router-dom';
import { useGetBlogByIdQuery, useUpdateBlogMutation } from '../../redux/apiSlicers/Blog';
import React, { useEffect, useRef, useState } from "react"
import { Form, Button, Input, Select, message } from "antd"
import { FormLayoutV1 } from "../../components/formLayouts/FormLayoutV1";
import { useGetCategorysQuery } from "../../redux/apiSlicers/Category";
import ModelEditor from "../../components/editors/ModelEditor";
import { ImageUploaderInput } from "../../components/formInputs/CustomFormFields";
import { useAddBlogMutation, useDeleteBlogMutation } from "../../redux/apiSlicers/Blog";
import { validateMessages } from "../../utils/validateMessages";

export default function BlogFormEdit() {
    const navigate = useNavigate()
    const { data: categories } = useGetCategorysQuery()
    const [updateBlog] = useUpdateBlogMutation()
    const [form] = Form.useForm()
    const [image, setImage] = useState(null)
    const editorRef = useRef(null);

    const { id } = useParams();
    const { data, isLoading } = useGetBlogByIdQuery(id, {
        skip: !id
    })
    const handleFinish = (values) => {
        updateBlog({
            id: data.id,
            ...values,
            image: image.image,
            content: editorRef.current.getContent()
        }).then(res => {
            navigate("/blog")
        }).catch(err => console.log(err))

    }
    useEffect(() => {
        console.log(data)
        if (data) {
            form.setFieldsValue({ ...data, categoryId: data?.category?.id })
            setImage({
                image: data.image
            })
        }
    }, [id, JSON.stringify(data)])
    console.log(data)
    return <FormLayoutV1 title={"Tạo Tin Mới"} styleWrapper={{ maxWidth: "1500px" }}>
        <Form
            labelCol={{ span: 3 }}
            labelWrap
            wrapperCol={{ span: 21 }}
            layout="horizontal"
            form={form}
            onFinish={handleFinish}
            validateMessages={validateMessages}
        >
            <Form.Item label="Tiêu đề" name="title" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Chủ đề" name="categoryId" rules={[{ required: true }]}>
                <Select
                    options={categories?.map(i => {
                        return {
                            value: i.id,
                            label: i.name
                        }
                    })}
                />
            </Form.Item>
            <Form.Item label="Hình ảnh - 16:9" rules={[{ required: true }]}>
                <ImageUploaderInput multipleAllow={false} name="image" value={image ? image.image : null}
                    setState={setImage}
                />
            </Form.Item>
            <Form.Item label="Nội dung" name="content">
                <ModelEditor editorRef={editorRef} initialValue={data?.content} />
            </Form.Item>

            <div style={{ textAlign: "center", margin: "0 auto" }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Lưu thay đổi
                </Button>
            </div>
        </Form>
    </FormLayoutV1>
}