import { Button, Form, Input } from "antd"
import { useEffect, useState } from "react"
import { ImageUploaderInput } from "../components/formInputs/CustomFormFields"
import { useGetContactsQuery, useUpdateContactMutation } from "../redux/apiSlicers/Contact"

export const Contact: React.FC = () => {
    const { data } = useGetContactsQuery()
    console.log(data)
    const [updateContact, { isLoading }] = useUpdateContactMutation()
    const [image, setImage] = useState<{
        image: string
    }>()

    const handleFinish = (val: any) => {
        console.log(val)
        data && updateContact({ ...val, id: data[0].id as string, image: image?.image })
    }

    useEffect(() => {
        if (data) {
            form.setFieldsValue(data[0])
            setImage({
                "image": data[0]?.image
            })
        }
    }, [data, data?.length])

    const [form] = Form.useForm()
    return <>
        <div style={{ marginTop: 70 }}>
            <Form labelCol={{ span: 3 }} wrapperCol={{ xs: { span: 21 }, lg: { span: 10 } }} form={form} onFinish={handleFinish}>
                <Form.Item label="Số điện thoại" name="phone">
                    <Input />
                </Form.Item>
                <Form.Item label="Địa chỉ" name="address">
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input />
                </Form.Item>
                <Form.Item label="Zalo" name="zalo">
                    <Input />
                </Form.Item>
                <Form.Item label="Facebook" name="facebook">
                    <Input />
                </Form.Item>
                <Form.Item label="Hình ảnh - 16:9">
                    <ImageUploaderInput multipleAllow={false}
                        value={image?.image}
                        setState={setImage}
                    />
                </Form.Item>

                <Form.Item label="Map" name="map">
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Button htmlType="submit" type="primary" style={{ marginLeft: 300 }} loading={isLoading}>
                    Lưu thay dổi
                </Button>
            </Form>
        </div>
    </>
} 