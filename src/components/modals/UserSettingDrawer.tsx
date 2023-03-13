import React, { useEffect, useState } from 'react'
import { Modal, Button, Drawer, Space, Form, Input, Upload, Select, message } from 'antd'
import { useDispatch } from 'react-redux'
import { TitleComponent } from '../Title';
import { ImageUploaderInput } from '../formInputs/CustomFormFields';
import { useEditUserMutation, useRegisterAdminMutation } from '../../redux/apiSlicers/Auth';
import { logOut } from '../../redux/slices/authSlicer';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface UserSettingType {
  open: boolean,
  onCancel: ((e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void)
}

function UserSetting({ open, onCancel }: UserSettingType) {
  const [image, setImage] = useState<{ avatar: string }>()
  const [editUser] = useEditUserMutation()
  const { userId, avatar } = useSelector((state: RootState) => state.auth)
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const showChildrenDrawer = () => {
    setChildrenDrawer(true);
  };
  const onChildrenDrawerClose = () => {
    setChildrenDrawer(false);
  };

  const handleForm = (values: any) => {
    console.log({ ...values, avatar: image?.avatar, id: userId })
    editUser({ ...values, avatar: image?.avatar, id: userId }).unwrap().then(res => {
      message.success("Cập nhật thành công")

    }).catch(err => {
      console.log(err)
      message.error("Cập nhật thất bại")
    })
  }
  useEffect(() => {
    avatar && setImage({ avatar })
  }, [avatar])

  useEffect(() => {
    form.setFieldValue("email", "admin@email.com")
  }, [])
  return (
    <div>
      <Drawer
        width={360}
        open={open}
        onClose={onCancel}
        closeIcon={"X"}
        push={false}

        extra={
          <Space size={5} >
            <Button type="dashed" onClick={showChildrenDrawer}>
              Thêm admin
            </Button>
            <Button key="logout" danger onClick={() => dispatch(logOut())}>
              Đăng xuất
            </Button>
            <Button key="save" type='primary' onClick={() => form.submit()}>
              Lưu
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          onFinish={handleForm}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          labelWrap={true}
          layout="horizontal">
          <TitleComponent text={"Thông tin người dùng"} level={3} />
          <Form.Item label="Email" colon={false} name="email">
            <Input disabled />
          </Form.Item>
          <ImageUploaderInput label="Hình đại diện" multipleAllow={false} setState={setImage} name="avatar" value={image?.avatar} />
          <div style={{ width: "100%", height: 50 }}>

          </div>
          {/* <TitleComponent text={"Settings"} level={3} />
          <Form.Item
            name="Language"
            label="Language"
            colon={false}
          >
            <Select defaultValue={"VN"}>
              <Select.Option value="VN">VietNamese</Select.Option>
              <Select.Option value="EN">English</Select.Option>
            </Select>
          </Form.Item> */}
          {/* <Form.Item
            name="Theme"
            label="Theme"
            colon={false}
          >
            <Select defaultValue={"L"} >
              <Select.Option value="L">Light</Select.Option>
              <Select.Option value="D">Dark</Select.Option>
            </Select>
          </Form.Item> */}
        </Form>

        <AddAdmin onChildrenDrawerClose={onChildrenDrawerClose} childrenDrawer={childrenDrawer} />

      </Drawer>
    </div >
  )
}

const AddAdmin: React.FC<{
  onChildrenDrawerClose: () => void, childrenDrawer: boolean
}> = ({ onChildrenDrawerClose, childrenDrawer }) => {

  const [form] = Form.useForm()
  const [registerAdmin, { isLoading }] = useRegisterAdminMutation()
  const handleSubmit = (values: any) => {
    console.log(values)
    registerAdmin(values).unwrap().then(res => {
      form.resetFields()
      onChildrenDrawerClose()
      message.success("Đăng ký admin thành công")
    }).catch(err => {
      console.log(err)
      message.error("Đăng ký thất bại")
    })
  }
  return <Drawer
    title="Đăng ký tài khoản admin"
    width={350}
    onClose={onChildrenDrawerClose}
    open={childrenDrawer}
  >
    <Form
      form={form}
      labelCol={{ span: 7 }}
      wrapperCol={{ span: 17 }}
      style={{ marginTop: 20 }}
      onFinish={handleSubmit}
      labelWrap={true}
      layout="horizontal">
      <Form.Item label="Email" colon={false} name="email"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Mật khẩu"
        colon={false}
        name="password"
        rules={[{ required: true }]}
      >
        <Input.Password />
      </Form.Item>
      <div style={{ textAlign: "center" }}>
        <Button type='primary' htmlType='submit'>Lưu</Button>
      </div>
    </Form>
  </Drawer>
}

export default UserSetting