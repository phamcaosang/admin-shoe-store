import React, { useEffect, useRef, useState } from "react"
import { Form, Button, Input, Select, message } from "antd"
import { FormLayoutV1 } from "../../components/formLayouts/FormLayoutV1";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCategorysQuery } from "../../redux/apiSlicers/Category";
import ModelEditor from "../../components/editors/ModelEditor";
import { ImageUploaderInput } from "../../components/formInputs/CustomFormFields";
import { useAddBlogMutation, useDeleteBlogMutation } from "../../redux/apiSlicers/Blog";
import { validateMessages } from "../../utils/validateMessages";


const BlogForm = () => {
    const { data: categories } = useGetCategorysQuery()
    const editorRef = useRef(null);
    const [image, setImage] = useState(null)
    const [addBlog, { isLoading }] = useAddBlogMutation()
    const [form] = Form.useForm()



    const handleFinish = (values) => {
        console.log(image)
        if (!image) {
            return message.error("Nên có hình ảnh cho tin tức")
        }
        addBlog({
            ...values,
            image: image?.image,
            content: editorRef.current?.getContent()
        }).unwrap().then(res => {
            form.resetFields()
            setImage(null)
        }).catch(err => console.log(err))
    }



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
                <ModelEditor editorRef={editorRef} initialValue={""} />
            </Form.Item>

            <div style={{ textAlign: "center", margin: "0 auto" }}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Tạo mới
                </Button>
            </div>
        </Form>
    </FormLayoutV1>
}

export default BlogForm;