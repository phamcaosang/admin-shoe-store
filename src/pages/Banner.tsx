import { useEffect, useState } from "react"
import { Button, Form, Modal, Table, Tag } from "antd"
import type { ColumnsType, TableProps } from 'antd/es/table';
import { BannerModelForm, BannerModelFull, useAddBannerMutation, useDeleteBannerMutation, useGetBannersQuery } from "../redux/apiSlicers/Banner";
import { PopupSelectionDeleteItem } from "../components/modals/PopupSelectionModals";
import { ImageUploaderInput } from "../components/formInputs/CustomFormFields";
import { notifyError, notifySuccess } from "../utils/alert";


const AddBanner: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<BannerModelForm>({
        imageDesktop: "",
        imageMobile: ""
    })
    const [addBanner, { isLoading, isSuccess }] = useAddBannerMutation()

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        if (!data.imageDesktop || !data.imageMobile) {
            return notifyError("Vui lòng chọn đầy đủ ảnh cho 2 loại màn hình")
        }
        console.log(data)
        addBanner(data)
    };
    const handleCancel = () => {
        setOpen(false);
    };
    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
            setData({
                imageDesktop: "",
                imageMobile: ""
            })
        }
    }, [isSuccess])

    return <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary" onClick={showModal}>Thêm ảnh mới</Button>
        <Modal
            // width={1080}
            width={550}
            open={open}
            title="Thêm banner mới"
            onCancel={() => { setOpen(false) }}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Trở lại
                </Button>,
                <Button key="submit" type="primary" loading={isLoading} onClick={handleOk}>
                    Thêm mới
                </Button>,
            ]}
        >
            <ImageUploaderInput label="Ảnh máy tính" multipleAllow={false} setState={setData} name="imageDesktop" />
            <ImageUploaderInput label="Ảnh điện thoại" multipleAllow={false} setState={setData} name="imageMobile" />
        </Modal>
    </div>
}


export const Banner: React.FC = () => {
    const { data, isLoading } = useGetBannersQuery()
    const [deleteBanner] = useDeleteBannerMutation()

    const [openDelete, setOpenDelete] = useState(false);
    const [dataView, setDataView] = useState<BannerModelFull | null>(null);
    const showModalDelete = (record: BannerModelFull) => {
        setDataView(record)
        setOpenDelete(true);
    };
    const hideModalDelete = () => {
        setDataView(null)
        setOpenDelete(false);
    };

    const columnTable: ColumnsType<BannerModelFull> = [
        {
            title: 'Ảnh kích thước máy tính - Tất cả hình nên theo 1 tỉ lệ 3:1 hoặc 5:2',
            dataIndex: 'imageDesktop',
            width: '60%',
            render: (value: string) => {
                return <img
                    src={value}
                    alt={value}
                    style={{
                        width: '100%',
                        border: "1px solid #233"
                    }}
                />
            }
        },
        {
            title: 'Ảnh kích thước điện thoại - Tỉ lệ 1:1',
            dataIndex: 'imageMobile',
            width: '25%',
            render: (value: string) => {
                return <img
                    src={value}
                    alt={value}
                    style={{
                        width: '100%',
                        border: "1px solid #233"

                    }}
                />
            }
        },
        {
            title: 'Hành động',
            key: 'operation',
            fixed: 'right',
            width: '20%',
            render: (record: any) =>
                <>
                    {/* <Tag color="blue" style={{ cursor: "pointer" }}>Sửa</Tag> */}
                    <Tag color="red" style={{ cursor: "pointer" }} onClick={() => showModalDelete(record)}>Xóa</Tag>
                </>,
        },
    ]

    return <div style={{ overflow: "scroll" }}>
        <AddBanner />
        <div style={{ marginTop: 30 }}>
            <Table columns={columnTable} dataSource={data} loading={isLoading} />
        </div>
        {
            openDelete && <PopupSelectionDeleteItem
                deleteItem={deleteBanner}
                itemType={"Banner"}
                open={openDelete}
                onCancel={hideModalDelete}
                data={{
                    ...dataView,
                    name: "đã chọn"
                }}
            />
        }
    </div>
}