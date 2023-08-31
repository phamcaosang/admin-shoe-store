import { Form, Input, InputNumber, Select, Switch, Button } from "antd";
import React, { ReactNode } from "react";

interface InputFieldType {
    label: string,
    name?: string,
    value?: string | number,
    required?: boolean,
    setState: React.Dispatch<React.SetStateAction<any>>,
    formItemStyle?: any,
    inputStyle?: any,
    disabled?: boolean
}

interface TextAreaFieldType {
    label: string,
    name?: string,
    value?: string,
    rows?: number,
    setState: React.Dispatch<React.SetStateAction<any>>,
    formItemStyle?: any,
    inputStyle?: any
}

interface InputNumberFieldType extends InputFieldType {
    configInputOptions?: any,
}

interface option {
    id: string,
    name: string
}
interface SelectFieldType {
    label: string | React.ReactNode,
    name: string,
    setState: React.Dispatch<React.SetStateAction<any>>,
    required?: boolean,
    options?: option[],
    defaultValue: string | undefined,
    formItemStyle?: any,
    selectStyle?: any,
    propertyId?: string,
    optionStyle?: any,
    children?: ReactNode
}

interface InputSwitchField {
    label: string,
    formItemStyle?: any,
    switchStyle?: any
}

interface SubmitBtnType {
    formItemStyle?: any,
    buttonStyle?: any,
    loading?: boolean,
    text: string
}

export const InputField: React.FC<InputFieldType> = ({ label, name, value, setState, formItemStyle, inputStyle, required, disabled }) => {
    return <Form.Item rules={[{ required: true }]} colon={false} label={label} style={formItemStyle} >
        <Input
            name={name}
            required={required}
            value={value}
            style={inputStyle}
            disabled={disabled}
            onChange={(e) => setState && setState((prev: any) => {
                return {
                    ...prev,
                    [e.target.name]: e.target.value
                }
            })}
        />
    </Form.Item>
}

export const TextAreaField: React.FC<TextAreaFieldType> = ({ label, name, value, setState, rows, formItemStyle, inputStyle }) => {
    return <Form.Item colon={false} label={label} style={formItemStyle} initialValue={value}>
        <Input.TextArea
            rows={rows}
            name={name}
            value={value}
            style={inputStyle}
            onChange={(e) => setState && setState((prev: any) => {
                return {
                    ...prev,
                    [e.target.name]: e.target.value
                }
            })}
        />
    </Form.Item>
}

export const SelectField: React.FC<SelectFieldType> = ({ label, name, options, defaultValue, formItemStyle, selectStyle, optionStyle, setState, required, children, propertyId }) => {
    return defaultValue ? <Form.Item label={label} name={name} style={formItemStyle} colon={false}>
        {children}
        <Select
            showSearch
            optionFilterProp="children"
            style={selectStyle} placeholder={`Select ${label}`} defaultValue={defaultValue} onChange={(value: any, option: any) => {
                setState && setState((prev: any) => {
                    if (name === "color") {
                        return {
                            ...prev,
                            "color": {
                                "propertyId": propertyId,
                                "propertyValueId": value
                            }
                        }
                    }

                    return {
                        ...prev,
                        [name]: value
                    }
                })

            }}>
            {options?.map(item => <Select.Option value={item.id} key={item.id} style={optionStyle}>{item.name}</Select.Option>)}
        </Select>
    </Form.Item > : <></>
}

export const InputNumberField: React.FC<InputNumberFieldType> = ({ label, name, value, setState, formItemStyle, inputStyle, required, configInputOptions }) => {
    return <Form.Item label={label} style={formItemStyle}>
        <InputNumber {...configInputOptions} style={inputStyle}
            name={name}
            required={required}
            value={value}
            onChange={(e) => setState && setState((prev: any) => {
                return {
                    ...prev,
                    [name as string]: e
                }
            })}
            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
        />
    </Form.Item>
}

export const SwitchField: React.FC<InputSwitchField> = ({ label, formItemStyle, switchStyle }) => {
    return <Form.Item label={label} style={formItemStyle}>
        <Switch style={switchStyle} />
    </Form.Item>
}


export const SubmitBtn: React.FC<SubmitBtnType> = ({ text, formItemStyle, buttonStyle, loading }) => {
    return <Form.Item style={{ textAlign: "center" }} colon={false} labelCol={{ span: 12 }} wrapperCol={{}}>
        <Button type="primary" htmlType="submit" style={buttonStyle} loading={loading}>
            {text}
        </Button>
    </Form.Item>
}