import { useState } from "react";
import { Createbtn } from "../../components/buttons/Createbtn";
import { Deletebtn } from "../../components/buttons/Deletebtn";
import { Editbtn } from "../../components/buttons/Editbtn";
import { Table, Tag } from "antd"
import { getColumnSearchProps } from "../../components/formInputs/SearchInputColumn";
import { PopupSelectionDeleteItem } from "../../components/modals/PopupSelectionModals";
import { useDeleteBlogMutation, useGetBlogsQuery } from "../../redux/apiSlicers/Blog";

const TableBrandProps = (showModalDelete) => {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const furtherSearchProp = (dataIndex) => {
        return getColumnSearchProps({ dataIndex, searchedColumn, setSearchedColumn, searchText, setSearchText, searchInput, setSearchInput })
    }

    return [
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            width: '50%',
            ...furtherSearchProp('title')
        },
        {
            title: 'Chủ đề',
            dataIndex: 'category',
            width: '15%',
            render: (val) => {
                return <Tag style={{ padding: "5px 10px", fontWeight: "bold" }} color="cyan">{val?.name}</Tag>
            }
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            width: '20%',
            render: (image) => {
                return image ? <img src={image} style={{
                    height: 60, objectFit: 'cover'
                }} alt="alt" /> : <></>
            }
        },
        {
            title: 'Hành động',
            key: 'operation',
            fixed: 'right',
            width: '15%',
            render: (record) =>
                <>
                    {/* <Viewbtn text="View" action={() => showModalView(record)} /> */}
                    <Editbtn direction={`/blog/edit/${record.id}`} text="Sửa" />
                    <Deletebtn text='Xóa' action={() => showModalDelete(record)} />
                </>,
        },
    ]


}

export default function Blob() {
    const [openDelete, setOpenDelete] = useState(false);
    const [dataView, setDataView] = useState(null);
    const { data, isLoading } = useGetBlogsQuery()
    const [deleteBlog] = useDeleteBlogMutation()


    const showModalDelete = (record) => {
        console.log(record)
        setDataView(record)
        setOpenDelete(true);
    };
    const hideModalDelete = () => {
        setDataView(null)
        setOpenDelete(false);
    };
    return <div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Createbtn direction={`/blog/create`} text={`Tạo tin mới`} />
        </div>
        <Table
            columns={TableBrandProps(showModalDelete)}
            dataSource={data}
            loading={isLoading}
            pagination={{ pageSize: 13 }}
        />
        {
            openDelete && <PopupSelectionDeleteItem
                deleteItem={deleteBlog}
                itemType={"tin tức"}
                open={openDelete}
                onCancel={hideModalDelete}
                data={dataView}
            />
        }
    </div>
}