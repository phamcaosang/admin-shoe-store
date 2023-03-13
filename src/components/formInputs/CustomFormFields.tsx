import { Button, Form, Input, Tooltip, Upload } from "antd"
import { ReactNode, useState, useEffect } from "react"
import { PopupSelectionModal, PopupSelectionModalSpecProp } from "../modals/PopupSelectionModals"
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { TypeType } from "../../utils/propsDummy/BrandProps";
import { PopupAddSpecPropModal } from "../modals/PopupAddModal";
import { UploadChangeParam } from "antd/lib/upload";
import { UploadFile, UploadProps } from "antd/es/upload";
import { PlusOutlined } from '@ant-design/icons';
import UploadWidget from "../../utils/uploadWidget";
import { notifyError } from "../../utils/alert";
import { useAddPropertyMutation } from "../../redux/apiSlicers/Property";



interface InputSizeFieldType {
    label?: string,
    formItemStyle?: any
    children: ReactNode
}


export const InputSizeField: React.FC<InputSizeFieldType> = ({ label, formItemStyle, children }) => {
    return <Form.Item label={label} style={formItemStyle} wrapperCol={{ span: 24 }}>
        {children}
    </Form.Item>
}


interface AddSpecPropComponentType {
    prodType: TypeType
}

interface SpecProp {
    id: string,
    label: string
}


export const AddSpecPropComponent: React.FC<AddSpecPropComponentType> = ({ prodType }) => {
    const [open, setOpen] = useState(false)

    return <>
        <Tooltip title="Add new Specification Prop"><PlusCircleOutlined onClick={() => setOpen(true)} /></Tooltip>
        <PopupAddSpecPropModal
            title={`Thêm thông số kỹ thuật mới cho ${prodType.name}`}
            open={open}
            setOpen={setOpen}
            onCancel={() => setOpen(false)}
            prodType={prodType}
        />
    </>
}

interface DynamicAddFormSpecPropType {
    prodType?: string,
    children: ReactNode
}

export const DynamicAddFormSpecProp: React.FC<DynamicAddFormSpecPropType> = ({ prodType, children }) => {
    const [props, setProps] = useState<SpecProp[]>([])

    const [popup, setPopup] = useState(false)

    return <Form
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 15 }}
        layout="horizontal"
        labelWrap
    >

        {props?.map(item => <Form.Item label={item.label} key={item.id} style={{ marginBottom: 10 }} colon={false}>
            <Input />
        </Form.Item>
        )}

        <div style={{
            textAlign: props.length > 0 ? "center" : "left"
        }}>
            <Button type="dashed"
                style={{
                    padding: "15px 50px",
                    borderRadius: 5
                }}
                onClick={() => setPopup(true)}
            >
                Add Field
            </Button>
        </div >
        <PopupSelectionModalSpecProp
            title="Chọn thông số kỹ thuật"
            open={popup}
            setOpen={setPopup}
            onCancel={() => setPopup(false)}
            selected={props}
            setSelected={setProps}
            prodType={prodType}
        >
            {children}
        </PopupSelectionModalSpecProp>
    </Form >
}

interface ImageUploader {
    label?: string,
    multipleAllow?: boolean,
    name?: string,
    value?: string | string[],
    setState?: React.Dispatch<React.SetStateAction<any>>,
    propertyValueId?: string,
    labelColSpan?: number,
    wrapperColSpan?: number
}

export const ImageUploaderInput: React.FC<ImageUploader> = ({ label, name = "image", multipleAllow = false, setState, value, propertyValueId, labelColSpan, wrapperColSpan }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const setStateImage = (image: string | undefined) => {
        if (propertyValueId) {
            setState && setState((prev: any) => {
                const selected = prev.find((i: any) => i.propertyValueId === propertyValueId)

                return prev.map((i: any) => {
                    if (i.propertyValueId === propertyValueId) {
                        return {
                            ...selected,
                            [name]: [...selected[name], image]
                        }
                    }
                    return i
                })
            })

            return;
        }

        setState && setState((prev: any) => {
            if (!multipleAllow) {
                return {
                    ...prev,
                    [name]: image
                }
            } else {
                return {
                    ...prev,
                    [name]: [...prev[name], image]
                }
            }
        })
    }
    useEffect(() => {
        console.log(value)
        if (!value) {
            setFileList([])
            return
        }
        if (multipleAllow) {
            const imageValue = value as string[]
            setFileList(imageValue ? imageValue.map((item, index) => {
                return {
                    uid: index.toString(),
                    name: index.toString(),
                    status: 'done',
                    url: item
                }
            }) : [])
        } else {
            const imageValue = value as string;
            console.log(imageValue)
            imageValue && setFileList([{
                uid: imageValue,
                name: imageValue,
                status: 'done',
                url: imageValue
            }])
        }
    }, [value])

    function handleOnUpload(error: any, result: any, widget: any) {

        if (error) {
            console.log(error);
            notifyError("Failed to upload image")
            widget.close({
                quiet: true
            });
            return;
        }
        setFileList(prev => [
            ...prev,
            {
                uid: result.info.asset_id,
                name: result.info.public_id,
                status: 'done',
                url: result.info.secure_url
            } as UploadFile
        ]
        )
        console.log("new image", result.info.secure_url)
        setStateImage(result.info.secure_url as string)

    }

    const handleChange: UploadProps['onChange'] = ({ file: selected, fileList: newFileList }) => {
        setFileList(prev => prev.filter(item => item.uid !== selected.uid))
        console.log(propertyValueId)

        if (propertyValueId) {
            setState && setState((prev: any) => {
                const selectedColor = prev.find((i: any) => i.propertyValueId === propertyValueId)
                console.log(selected)
                console.log(selected.url)

                return prev.map((i: any) => {
                    if (i.propertyValueId === propertyValueId) {
                        return {
                            ...selectedColor,
                            [name]: selectedColor[name].filter((i: string) => i !== selected.url)
                        }
                    }
                    return i
                })
            })
            return;
        }


        // setState && setState((prev: any) => {
        //     if (!multipleAllow) {
        //         return {
        //             ...prev,
        //             [name]: undefined
        //         }
        //     }
        //     return {
        //         ...prev,
        //         [name]: prev[name].filter((i: string) => i !== selected.url)
        //     }
        // })
    }

    return <>
        <UploadWidget onUpload={handleOnUpload} multipleAllow={multipleAllow}>
            {({ open }: { open: () => void }) => {
                // function handleOnClick() {
                //     open();
                // }
                return (
                    <Form.Item label={label} valuePropName="fileList" colon={false} labelCol={{ span: labelColSpan || 5 }} wrapperCol={{ span: wrapperColSpan || 19 }}>
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            openFileDialogOnClick={false}
                            onChange={(info: UploadChangeParam<UploadFile<any>>) => handleChange(info)}>
                            <div onClick={() => open()} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }} >Upload</div>
                                </div>
                            </div>
                        </Upload>
                    </Form.Item >
                )
            }}
        </UploadWidget>


    </>
}