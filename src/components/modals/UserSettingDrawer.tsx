import React, { useState } from 'react'
import { Modal, Button, Drawer, Space, Form, Input, Upload, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { HandleLogout } from '../../redux/actions/authAction'
import { useDispatch } from 'react-redux'
import { TitleComponent } from '../Title';
import { ImageUploaderInput } from '../formInputs/CustomFormFields';

interface UserSettingType {
  open: boolean,

  onCancel: ((e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>) => void)
}

function UserSetting({ open, onCancel }: UserSettingType) {
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
    console.log({ ...values, avatar: image?.avatar });
  }
  const [image, setImage] = useState<{ avatar: string }>()
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
            {/* <Button key="dashed" onClick={onCancel} style={{ fontSize: 10 }}>
              <GrClose />
            </Button> */}
            <Button type="dashed" onClick={showChildrenDrawer}>
              Thêm admin
            </Button>
            <Button key="logout" danger onClick={() => { HandleLogout(dispatch) }}>
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
          {/* <Form.Item label="Số điện thoại" colon={false}>
            <Input />
          </Form.Item> */}
          <Form.Item label="Mật khẩu" colon={false} name="password">
            <Input.Password />
          </Form.Item>
          {/* <Form.Item label="Avatar" valuePropName="fileList" colon={false} >
            <Upload listType="picture-card" maxCount={1} onChange={(info: UploadChangeParam<UploadFile<any>>) => console.log(info)}>
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item> */}
          <ImageUploaderInput label="Hình đại diện" multipleAllow={false} setState={setImage} name="avatar" />
          {/* <Form.Item
            name="gender"
            label="Gender"
            colon={false}
          >
            <Select placeholder="select your gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item> */}

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

        <Drawer
          title="Đăng ký tài khoản admin"
          width={350}
          onClose={onChildrenDrawerClose}
          open={childrenDrawer}
        >
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            style={{ marginTop: 20 }}
            labelWrap={true}
            layout="horizontal">
            <Form.Item label="Email" colon={false}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Số điện thoại" colon={false}>
              <Input />
            </Form.Item>
            <Form.Item label="Mật khẩu"
              colon={false}
              rules={[{ required: true }]}
            >
              <Input.Password />
            </Form.Item>
            <div style={{ textAlign: "center" }}>
              <Button type='primary'>Lưu</Button>
            </div>
          </Form>
        </Drawer>

      </Drawer>
    </div >
  )
}

export default UserSetting