import { Button, Form, Input, Divider } from "antd"
import { useEffect, useState } from "react"
import { ImageUploaderInput } from "../components/formInputs/CustomFormFields"
import { useGetInfoQuery, useUpdateInfoMutation } from "../redux/apiSlicers/Info"
import { notifyError, notifySuccess } from "../utils/alert"

export const Info = () => {
    const { data: Infos, isSuccess } = useGetInfoQuery()
    const [updateInfo, { isLoading: loadingEdit }] = useUpdateInfoMutation()
    const [image, setImage] = useState({
        image: null
    })

    const handleFinish = (val) => {
        const submitData = [
            {
                id: 1,
                title: val.title_1,
                data: val.data_1
            },
            {
                id: 2,
                title: val.title_2,
                data: val.data_2
            },
            {
                id: 3,
                title: val.title_3,
                data: val.data_3
            },
            {
                id: 4,
                title: "Image",
                data: image.image
            }
        ]
        console.log(submitData);
        updateInfo(submitData).unwrap().then(res => {
            notifySuccess("Thông tin đã được cập nhật")
        }).catch(err => {
            console.log(err)
            notifyError(err.data.message)
        })
    }

    useEffect(() => {
        if (isSuccess) {
            // form.setFieldsValue(data[0])
            form.setFieldsValue({
                title_1: Infos[0].title,
                title_2: Infos[1].title,
                title_3: Infos[2].title,
                data_1: Infos[0].data,
                data_2: Infos[1].data,
                data_3: Infos[2].data,
            })
            setImage({
                "image": Infos[3]?.data
            })
        }
    }, [isSuccess])

    const [form] = Form.useForm()
    return <>
        <div style={{ marginTop: 70, maxWidth: 720, marginLeft: 100 }}>
            <Form form={form} onFinish={handleFinish}>
                <Form.Item name="title_1">
                    <Input style={{ width: 250 }} />
                </Form.Item>
                <Form.Item name="data_1">
                    <Input />
                </Form.Item>

                <Divider />

                <Form.Item name="title_2">
                    <Input style={{ width: 250 }} />
                </Form.Item>
                <Form.Item name="data_2">
                    <Input />
                </Form.Item>

                <Divider />

                <Form.Item name="title_3">
                    <Input style={{ width: 250 }} />
                </Form.Item>
                <Form.Item name="data_3">
                    <Input />
                </Form.Item>

                <Divider />

                <Form.Item name="title_4">
                    <Input style={{ width: 250 }} defaultValue="Hình ảnh tỉ lệ 3:2" disabled />
                </Form.Item>
                <Form.Item>
                    <ImageUploaderInput multipleAllow={false}
                        value={image?.image}
                        setState={setImage}
                    />
                </Form.Item>


                <Button htmlType="submit" type="primary" style={{ marginLeft: 300 }}
                    loading={loadingEdit}
                >
                    Lưu thay dổi
                </Button>
            </Form>
        </div>
    </>
} 