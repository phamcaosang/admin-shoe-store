import React, { useState } from 'react'
import { Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ColumnType } from 'antd/es/table';
import PopupViewFormV1 from '../../../components/modals/PopupViewModalV1';
import { Editbtn } from '../../../components/buttons/Editbtn';
import { Viewbtn } from '../../../components/buttons/Viewbtn';
import { Createbtn } from '../../../components/buttons/Createbtn';
import { BrandModelFull, useDeleteBrandMutation, useGetBrandsQuery } from '../../../redux/apiSlicers/Brand';
import { Deletebtn } from '../../../components/buttons/Deletebtn';
import { PopupSelectionDeleteItem } from '../../../components/modals/PopupSelectionModals';
import { getColumnSearchProps } from '../../../components/formInputs/SearchInputColumn';
import { CollectionModelFull, useDeleteCollectionMutation, useGetCollectionsQuery } from '../../../redux/apiSlicers/Collection';

const ItemName = "Bộ sưu tập"
const RouteName = 'collection'

const TableBrandProps = (showModalView: (record: CollectionModelFull) => void, showModalDelete: (record: CollectionModelFull) => void): ColumnsType<CollectionModelFull> => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const furtherSearchProp = (dataIndex: string): ColumnType<CollectionModelFull> => {
    return getColumnSearchProps({ dataIndex, searchedColumn, setSearchedColumn, searchText, setSearchText, searchInput, setSearchInput })
  }

  return [
    {
      title: 'Tên bộ sưu tập',
      dataIndex: 'name',
      width: '20%',
      ...furtherSearchProp('name')
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      width: '10%',
      render: (image: string | undefined) => {
        return image ? <img src={image} style={{
          width: 50, height: 50, objectFit: 'cover'
        }} alt="alt" /> : <></>
      }
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      width: '25%',
      ...furtherSearchProp('description'),
      responsive: ['md'],
      render: (dsc: string) => {
        return <Tooltip title={dsc}>
          {dsc.slice(0, 70)}
        </Tooltip>
      }
    },
    {
      title: 'Số sản phẩm',
      dataIndex: 'products',
      width: '25%',
      responsive: ['md'],
      render: (products) => {
        console.log(products)
        return products.length
      }
    },
    {
      title: 'Hành động',
      key: 'operation',
      fixed: 'right',
      width: '20%',
      render: (record: CollectionModelFull) =>
        <>
          <Viewbtn text="Xem" action={() => showModalView(record)} />
          <Editbtn direction={`/${RouteName}/edit/${record.id}`} text="Sửa" />
          <Deletebtn text='Xóa' action={() => showModalDelete(record)} />
        </>,
    },
  ]

}


const Collection: React.FC = () => {
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [dataView, setDataView] = useState<CollectionModelFull | null>(null);
  const { data, isLoading } = useGetCollectionsQuery()
  const [deleteBrand] = useDeleteCollectionMutation()
  console.log(data)

  const showModalView = (record: CollectionModelFull) => {
    setDataView(record)
    setOpenView(true);
  };
  const hideModalView = () => {
    setDataView(null)
    setOpenView(false);
  };

  const showModalDelete = (record: CollectionModelFull) => {
    setDataView(record)
    setOpenDelete(true);
  };
  const hideModalDelete = () => {
    setDataView(null)
    setOpenDelete(false);
  };



  return <div>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Createbtn direction={`/${RouteName}/create`} text={`Tạo bộ sưu tập mới`} />
    </div>
    <Table
      scroll={{ y: 'calc(100vh - 180px)' }}
      onRow={(record, rowIndex) => {
        return {
          onDoubleClick: () => {
            showModalView(record)
          }
        }
      }}
      columns={TableBrandProps(showModalView, showModalDelete)}
      dataSource={data}
      loading={isLoading}
    />
    {
      openView && <PopupViewFormV1
        title={`Thông tin: ${ItemName}`}
        open={openView}
        onOk={hideModalView}
        onCancel={hideModalView}
        data={dataView}
      />
    }
    {
      openDelete && <PopupSelectionDeleteItem
        deleteItem={deleteBrand}
        itemType={ItemName}
        open={openDelete}
        onCancel={hideModalDelete}
        data={dataView}
      />
    }
  </div>
}

export default Collection;

