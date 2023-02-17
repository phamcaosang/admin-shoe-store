
import React, { useEffect, useState } from "react"
import { Button, Form, Input, Select, Radio } from 'antd';
import { useParams } from "react-router-dom";
import { data, DataType } from "../../utils/propsDummy/UserProps";


/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};


const UserForm: React.FC<{ new: boolean }> = (prop) => {
    const onFinish = (values: any) => {
        console.log(values);
    };
    const [userData, setUserData] = useState<DataType>({
        key: 0,
        name: "",
        email: "",
        address: "",
        phone: "",
        status: "enable"
    })

    let { userId } = useParams();

    useEffect(() => {
        if (!prop.new && userId) {
            const result = data.find(i => i.key === userId)
            result && setUserData(result);
        }
    }, [userId, prop.new])

    const handleChange = (prev: DataType, e: React.ChangeEvent<HTMLInputElement>) => {
        return {
            ...prev,
            [e.target.name]: e.target.value
        }
    }

    if (prop.new) {
        return <div className="userWrapper" style={{
            margin: "0 auto",
            width: "750px",
            backgroundColor: "white",
            padding: "20px 0 20px 10px"
        }}>
            <h1 style={{
                fontSize: "32px",
                textAlign: "center",
                marginBottom: "30px"
            }}>User Create</h1>
            <Form name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name={['user', 'name']} label="Name">
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email', required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'password']} label="Password" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'address']} label="Address">
                    <Input />
                </Form.Item>
                <Form.Item name={['user', 'phone']} label="Phone">
                    <Input />
                </Form.Item>
                <Form.Item label="Status">
                    <Radio.Group>
                        <Radio value="enable"> Enable </Radio>
                        <Radio value="disable"> Disable </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }} colon={false}>
                    <Button type="primary" htmlType="submit">
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>

        </div>
    } else {
        return <div className="userWrapper" style={{
            margin: "0 auto",
            width: "750px",
            backgroundColor: "white",
            padding: "20px 0 20px 10px"
        }}>
            <h1 style={{
                fontSize: "32px",
                textAlign: "center",
                marginBottom: "30px"
            }}>User Edit</h1>
            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 18 }}
                layout="horizontal"
                name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item label="Name">
                    <Input value={userData?.name} name="name" onChange={(e) => setUserData(prev => handleChange(prev, e))} />
                </Form.Item>
                <Form.Item label="Email" rules={[{ type: 'email', required: true }]}>
                    <Input name="email" value={userData?.email} onChange={(e) => setUserData(prev => handleChange(prev, e))} />
                </Form.Item>
                <Form.Item label="Address">
                    <Input name="address" value={userData?.address} onChange={(e) => setUserData(prev => handleChange(prev, e))} />
                </Form.Item>
                <Form.Item label="Phone">
                    <Input name="phone" value={userData?.phone} onChange={(e) => setUserData(prev => handleChange(prev, e))} />
                </Form.Item>
                <Form.Item label="Status">
                    <Radio.Group defaultValue={userData?.status} onChange={(e) => setUserData(prev => {
                        return {
                            ...prev,
                            status: e.target.value
                        }
                    })}>
                        <Radio value="enable"> Enable </Radio>
                        <Radio value="disable"> Disable </Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }} colon={false}>
                    <Button type="primary" htmlType="submit">
                        Save Changes
                    </Button>
                </Form.Item>
            </Form>
        </div>
    }
}

export default UserForm