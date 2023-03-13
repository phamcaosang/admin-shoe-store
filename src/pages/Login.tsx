import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from "../redux/store"
import { useNavigate } from 'react-router-dom';
import { LoginForm, useLoginMutation } from '../redux/apiSlicers/Auth';
import { notifyError, notifySuccess } from '../utils/alert';



const Login: React.FC = () => {
    const navigate = useNavigate()
    const { accessToken } = useSelector((state: RootState) => state.auth)
    const [login, { isLoading, isSuccess }] = useLoginMutation()
    const onFinish = (values: LoginForm) => {
        login(values).unwrap().then((res: any) => {
            console.log(res)
            notifySuccess("Đăng nhập thành công")
        }).catch(err => {
            console.log(err)
            notifyError("Đăng nhập thất bại")
        })
    };

    useEffect(() => {
        if (accessToken) {
            navigate("/")
        }
    }, [accessToken])
    // useEffect(() => {
    //     // verifyUserAuth(dispatch)
    //     // if (auth.authenticated === true && auth.accessToken != null && auth.user != null) {
    //     //     navigate(-1);
    //     // }
    // }, [auth.authenticated, auth.accessToken, auth.user?.username])

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
                    <Button type="primary" htmlType="submit" className="login-form-button"
                        loading={isLoading}
                    >
                        Đăng nhập
                    </Button>
                </Form.Item>
            </Form>
            <Toaster />
        </div>
    );
};

export default Login;