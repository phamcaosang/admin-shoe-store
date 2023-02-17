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
import { useGetTypesQuery } from '../../../redux/apiSlicers/ProductType';
import { StoreModelFull, useDeleteStoreMutation, useGetStoreByIdQuery, useGetStoresQuery } from '../../../redux/apiSlicers/Store';

const ItemName = "Store"
const RouteName = 'store'

const TableStoreProps = (showModalView: (record: StoreModelFull) => void, showModalDelete: (record: StoreModelFull) => void): ColumnsType<StoreModelFull> => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const furtherSearchProp = (dataIndex: string): ColumnType<StoreModelFull> => {
    return getColumnSearchProps({ dataIndex, searchedColumn, setSearchedColumn, searchText, setSearchText, searchInput, setSearchInput })
  }

  return [
    {
      title: 'Name',
      dataIndex: 'name',
      width: '20%',
      ...furtherSearchProp('name')
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '35%',
      responsive: ['md'],
      ...furtherSearchProp('address')
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: '15%',
      responsive: ['md'],
      ...furtherSearchProp('phone')
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: '20%',
      render: (record: StoreModelFull) =>
        <>
          <Viewbtn text="View" action={() => showModalView(record)} />
          <Editbtn direction={`/${RouteName}/edit/${record.id}`} text="Edit" />
          <Deletebtn text='Delete' action={() => showModalDelete(record)} />
        </>,
    },
  ]

}


const Store: React.FC = () => {
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [dataView, setDataView] = useState<StoreModelFull | null>(null);
  const { data, isLoading } = useGetStoresQuery()
  const [deleteStore] = useDeleteStoreMutation()

  const showModalView = (record: StoreModelFull) => {
    setDataView(record)
    setOpenView(true);
  };
  const hideModalView = () => {
    setDataView(null)
    setOpenView(false);
  };

  const showModalDelete = (record: StoreModelFull) => {
    setDataView(record)
    setOpenDelete(true);
  };
  const hideModalDelete = () => {
    setDataView(null)
    setOpenDelete(false);
  };



  return <div>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Createbtn direction={`/${RouteName}/create`} text={`Add New ${ItemName}`} />
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
      columns={TableStoreProps(showModalView, showModalDelete)}
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
        deleteItem={deleteStore}
        itemType={ItemName}
        open={openDelete}
        onCancel={hideModalDelete}
        data={dataView}
      />
    }
  </div>
}

export default Store;

