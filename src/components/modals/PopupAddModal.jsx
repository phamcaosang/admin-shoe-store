
import React, { useState, useRef } from 'react'
import { Button, Form, Modal, Input } from 'antd'
import { useAddPropertyMutation } from '../../redux/apiSlicers/Property'
import { notifyError } from '../../utils/alert'
import { useEffect } from 'react'

export const PopupAddColorModal = ({ title, open, setOpen, onCancel, productType }) => {
    const colorRef = useRef(null)
    const [addProperty, addArgs] = useAddPropertyMutation()
    const handleOk = () => {
        const valueColor = colorRef.current.input.value
        if (valueColor === "") {
            return notifyError("Không thể thêm thuộc tính màu trống")
        }
        addProperty({
            name: "color",
            productTypeId: productType.id,
            values: [{
                value: valueColor
            }]
        })
        setOpen(false)
    }

    return (
        <div>
            <Modal
                title={title}
                open={open}
                onOk={handleOk}
                onCancel={onCancel}
                cancelText="Cancel"
                width={500}
            >
                <Form
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal">
                    <Form.Item label={"Màu"}>
                        <Input ref={colorRef} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export const PopupAddSizeModal = ({ title, open, setOpen, onCancel, productType }) => {
    const [addProperty, addArgs] = useAddPropertyMutation()
    const [size, setSize] = useState("")
    const handleOk = () => {
        if (!size) {
            notifyError("Xin nhập size tương thích")
            return
        }
        addProperty({
            name: 'size',
            productTypeId: productType.id,
            values: [{
                value: size
            }]
        })
    }
    useEffect(() => {
        if (addArgs.isSuccess) {
            setOpen(false)
            // setSize(null);
        }
    }, [addArgs.isSuccess])
    return (
        <div>
            <Modal
                title={title}
                open={open}
                onOk={handleOk}
                onCancel={onCancel}
                cancelText="Cancel"
                width={500}
            >
                <Form
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal">
                    <Form.Item label={"Kích thước"}>
                        <Input value={size} onChange={(e) => setSize(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export const PopupAddSpecPropModal = ({ title, open, setOpen, onCancel, prodType }) => {
    const [propertyName, setPropertyName] = useState()
    const [addProp, addArgs] = useAddPropertyMutation()

    const handleOk = () => {
        if (!propertyName) {
            notifyError("Xin nhập thông số kỹ thuật")
            return
        }
        addProp({
            name: propertyName,
            productTypeId: prodType.id
        })
    }
    useEffect(() => {
        if (addArgs.isSuccess) {
            setOpen(false)
            setPropertyName(null);
        }
    }, [addArgs.isSuccess])
    return (
        <div>
            <Modal
                title={title}
                open={open}
                onOk={handleOk}
                onCancel={onCancel}
                cancelText="Cancel"
                width={700}
            >
                <Form
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal">
                    <Form.Item label={"Thông số kỹ thuật"}>
                        <Input value={propertyName} onChange={(e) => setPropertyName(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}