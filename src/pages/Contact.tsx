import { Button, Form, Input } from "antd"
import { useEffect } from "react"
import { useGetContactsQuery, useUpdateContactMutation } from "../redux/apiSlicers/Contact"

export const Contact: React.FC = () => {
    const { data } = useGetContactsQuery()
    const [updateContact, { isLoading }] = useUpdateContactMutation()

    const handleFinish = (val: any) => {
        console.log(val)
        data && updateContact({ ...val, id: data[0].id as string })
    }

    useEffect(() => {
        if (data) {
            console.log(data)
            form.setFieldsValue(data[0])
        }
    }, [data, data?.length])

    const [form] = Form.useForm()
    return <>
        <div style={{ marginTop: 70 }}>
            <Form labelCol={{ span: 3 }} wrapperCol={{ span: 10 }} form={form} onFinish={handleFinish}>
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
                <Button htmlType="submit" type="primary" style={{ marginLeft: 300 }} loading={isLoading}>
                    Lưu thay dổi
                </Button>
            </Form>
        </div>
    </>
} 