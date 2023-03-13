import { Button, Modal, Form, Input, Table } from "antd"
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Deletebtn } from "../components/buttons/Deletebtn";
import { Editbtn } from "../components/buttons/Editbtn";
import { useAddCategoryMutation, useGetCategorysQuery } from "../redux/apiSlicers/Category";

export default function Category() {
    const { data, isLoading } = useGetCategorysQuery()
    const [addCategory, { isLoading: isLoadingAdd }] = useAddCategoryMutation()
    const columns = [
        {
            title: 'Tên chủ đề',
            dataIndex: 'name',
            width: '100%',
        },
    ]

    const [open, setOpen] = useState(false);
    const [form] = Form.useForm()
    const handleFinish = (values) => {
        if (values.name?.length < 4) {
            return toast.error("Không thể dưới 5 ký tự!!")
        }
        addCategory(values).unwrap().then(res => {
            form.resetFields()
            setOpen(false)
        }).catch(err => console.log(err))
    }
    const handleCancel = () => {
        setOpen(false);
        form.resetFields()
    };
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 30 }}>
                <Button type="primary" onClick={() => setOpen(true)}>Chủ đề mới</Button>
            </div>
            <Modal
                width={380}
                open={open}
                title="Thêm chủ đề mới"
                onCancel={() => { form.resetFields(); setOpen(false); }}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Trở lại
                    </Button>,
                    <Button key="submit" type="primary" onClick={() => form.submit()} loading={isLoadingAdd}>
                        Thêm mới
                    </Button>,
                ]}
            >
                <Form form={form} onFinish={handleFinish}>
                    <Form.Item name="name" >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} loading={isLoading} />
        </div >
    )
}
