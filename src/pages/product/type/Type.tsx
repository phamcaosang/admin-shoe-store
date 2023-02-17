import React, { useState } from 'react'
import { Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ColumnType } from 'antd/es/table';
import PopupViewFormV1 from '../../../components/modals/PopupViewModalV1';
import { Editbtn } from '../../../components/buttons/Editbtn';
import { Viewbtn } from '../../../components/buttons/Viewbtn';
import { Createbtn } from '../../../components/buttons/Createbtn';
import { Deletebtn } from '../../../components/buttons/Deletebtn';
import { PopupSelectionDeleteItem } from '../../../components/modals/PopupSelectionModals';
import { getColumnSearchProps } from '../../../components/formInputs/SearchInputColumn';
import { TypeModelFull, useDeleteTypeMutation, useGetTypesQuery } from '../../../redux/apiSlicers/ProductType';

const ItemName = "loại sản phẩm"
const RouteName = 'type'

const TableProductTypeProps = (showModalView: (record: TypeModelFull) => void, showModalDelete: (record: TypeModelFull) => void): ColumnsType<TypeModelFull> => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const furtherSearchProp = (dataIndex: string): ColumnType<TypeModelFull> => {
    return getColumnSearchProps({ dataIndex, searchedColumn, setSearchedColumn, searchText, setSearchText, searchInput, setSearchInput })
  }

  return [
    {
      title: 'Tên phân loại',
      dataIndex: 'name',
      width: '20%',
      ...furtherSearchProp('name')
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      width: '15%',
      render: (image: string | undefined) => {
        return image ? <img src={image} style={{
          width: 50, height: 50, objectFit: 'cover'
        }} alt="alt" /> : <></>
      }
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      width: '35%',
      responsive: ['md'],
      ...furtherSearchProp('description'),
      render: (dsc: string) => {
        return <Tooltip title={dsc}>
          {dsc.slice(0, 70)}
        </Tooltip>
      }
    },
    {
      title: 'Hành động',
      key: 'operation',
      fixed: 'right',
      width: '20%',
      render: (record: TypeModelFull) =>
        <>
          <Viewbtn text="View" action={() => showModalView(record)} />
          <Editbtn direction={`/${RouteName}/edit/${record.id}`} text="Edit" />
          <Deletebtn text='Delete' action={() => showModalDelete(record)} />
        </>,
    },
  ]

}


const Type: React.FC = () => {
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [dataView, setDataView] = useState<TypeModelFull | null>(null);
  const { data, isLoading } = useGetTypesQuery()
  const [deleteType] = useDeleteTypeMutation()

  const showModalView = (record: TypeModelFull) => {
    setDataView(record)
    setOpenView(true);
  };
  const hideModalView = () => {
    setDataView(null)
    setOpenView(false);
  };

  const showModalDelete = (record: TypeModelFull) => {
    setDataView(record)
    setOpenDelete(true);
  };
  const hideModalDelete = () => {
    setDataView(null)
    setOpenDelete(false);
  };



  return <div>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Createbtn direction={`/${RouteName}/create`} text={`Thêm phân loại sản phẩm`} />
    </div>
    <Table
      scroll={{ y: 'calc(100vh - 180px)' }}
      // onRow={(record, rowIndex) => {
      //   return {
      //     onDoubleClick: () => {
      //       showModalView(record)
      //     }
      //   }
      // }}
      columns={TableProductTypeProps(showModalView, showModalDelete)}
      dataSource={data}
      loading={isLoading}
    />
    {
      openView && <PopupViewFormV1
        title={`${ItemName} information`}
        open={openView}
        onOk={hideModalView}
        onCancel={hideModalView}
        data={dataView}
      />
    }
    {
      openDelete && <PopupSelectionDeleteItem
        deleteItem={deleteType}
        itemType={ItemName}
        open={openDelete}
        onCancel={hideModalDelete}
        data={dataView}
      />
    }
  </div>
}

export default Type;

