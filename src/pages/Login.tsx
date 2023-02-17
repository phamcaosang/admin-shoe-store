import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { HandleLogin, verifyUserAuth } from '../redux/actions/authAction';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store"
import { useNavigate } from 'react-router-dom';

interface LoginType {
    username: string,
    password: string
}

const Login: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const onFinish = async (values: LoginType) => {
        await HandleLogin(dispatch, values)
    };
    console.log(loading)

    const auth = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        verifyUserAuth(dispatch)
        if (auth.authenticated === true && auth.accessToken != null && auth.user != null) {
            navigate(-1);
        }
    }, [auth.authenticated, auth.accessToken, auth.user?.username])

    return (
        <div style={{
            width: "350px",
            textAlign: "center",
            margin: "200px auto 0 auto",
            padding: "40px 50px 10px 50px",
            border: "1px solid rgba(0,0,0,.1)",
            borderRadius: "8px"

        }}>
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Mật khẩu"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button" disabled={loading}>
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
            <div>username: admin   password: 123456</div>
            <Toaster />
        </div>
    );
};

export default Login;