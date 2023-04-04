import React, { useState } from 'react'
import { Button, Modal, Tag, Tooltip, Spin } from 'antd'
import { dataType } from '../../utils/propsDummy/BrandProps';
import { Link } from 'react-router-dom';
import { dataSpecProperty } from '../../utils/propsDummy/PropertyProps';
import { Dispatch } from "react";
import { useDeleteBrandMutation } from '../../redux/apiSlicers/Brand';
import { TypeModelFull, useGetTypesQuery } from '../../redux/apiSlicers/ProductType';
import { PropertyModelFull, useGetPropertysQuery } from '../../redux/apiSlicers/Property';

interface PopupSelectionModalType {
    title: string,
    open: boolean,
    onCancel: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void),
}

//use for productype selection
export const PopupSelectionModal = ({ title, open, onCancel }: PopupSelectionModalType) => {
    const { data, refetch, isLoading, isFetching } = useGetTypesQuery()
    return (
        <div>
            <Modal
                title={title}
                open={open}
                closable={false}
                footer={
                    <>
                        <Button onClick={onCancel}>Hủy</Button>
                        <Button type='primary' onClick={() => refetch()}>Load lại</Button>
                    </>
                }
                width={500}
            >
                <Spin spinning={isLoading || isFetching}>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        flexWrap: 'wrap'
                    }}>
                        {data?.map((item: TypeModelFull) => <Link style={{ margin: 5 }} to={`/product/create?type=${item.id}`}>
                            <Button key={item.id} style={{ padding: 20 }}>{item.name}</Button>
                        </Link>)}
                    </div>
                </Spin>

            </Modal>
        </div >
    )
}

interface PopupSelectionModalSpecPropType {
    prodType?: string,
    title: string,
    open: boolean,
    setOpen: Dispatch<React.SetStateAction<boolean>>,
    onCancel: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void),
    selected: any,
    setSelected: Dispatch<React.SetStateAction<any>>,
    children: React.ReactNode
}

interface PropertyModel {
    id: string,
    name: string
}

export const PopupSelectionModalSpecProp = ({ prodType, title, open, setOpen, onCancel, selected, setSelected, children }: PopupSelectionModalSpecPropType) => {
    const [option, setOption] = useState<{ id: string, label: string } | null>()
    const data = useGetPropertysQuery().data?.filter(i => !["size", "color"].includes(i.name.toLocaleLowerCase())).filter(i => i.productType.name === prodType)

    const handleOk = () => {
        if (option) {
            setSelected((prev: any) => [...prev, option])
            setOption(null)
        }
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
                width={700}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    flexWrap: 'wrap'
                }}>
                    {data?.filter(i => !selected.map((i: PropertyModelFull) => i.id).includes(i.id)).map((item: PropertyModel) =>
                        <Tag key={item.id} style={{ padding: 10, margin: 10, fontSize: 16, cursor: 'pointer' }}
                            onClick={() => setOption({
                                id: item.id,
                                label: item.name
                            })}
                        >{item.name}</Tag>)}
                    {children}
                </div>
            </Modal>

        </div>
    )
}

interface PopupSelectionDeleteItemType {
    itemType: string,
    open: boolean,
    onCancel: () => void,
    deleteItem: any,
    data: any,
    field?: string,
}
export const PopupSelectionDeleteItem = ({ itemType, open, onCancel, data, deleteItem, field }: PopupSelectionDeleteItemType) => {
    const handleDelete = () => {
        deleteItem(field ? data[field] : data.id)
        onCancel()
    }
    return <div>
        <Modal
            title={`Confirm delete ${itemType}`}
            open={open}
            onOk={handleDelete}
            onCancel={onCancel}
            okText="Delete"
            cancelText="Cancel"
            width={500}
            okButtonProps={{
                danger: true,
            }}
        >
            Bạn có chắc là xóa {itemType} {data && (`: ${field ? data[field] : (data.name || data.title)}`)}
        </Modal>
    </div >
}
