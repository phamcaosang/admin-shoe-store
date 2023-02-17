import React, { useState } from 'react';
import { Table, Tag } from 'antd';
import type { TableProps } from 'antd/es/table';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { DataType } from '../../utils/propsDummy/UserProps';
import { data } from '../../utils/propsDummy/UserProps';
import { Link } from 'react-router-dom';
import PopupViewFormV1 from '../../components/modals/PopupViewModalV1';
import { getColumnSearchProps } from '../../components/formInputs/SearchInputColumn';

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  // console.log('params', pagination, filters, sorter, extra);
};


const User: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [open, setOpen] = useState(false);
  const [dateView, setDataView] = useState<DataType | null>(null);

  const showModal = (record: DataType) => {
    setDataView(record)
    setOpen(true);
  };

  const hideModal = () => {
    setDataView(null)
    setOpen(false);
  };

  const furtherSearchProp = (dataIndex: string): ColumnType<DataType> => {
    return getColumnSearchProps({ dataIndex, searchedColumn, setSearchedColumn, searchText, setSearchText, searchInput, setSearchInput })
  }
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: 'left',
      width: '15%',
      ...furtherSearchProp('name')
    },
    {
      title: "Email",
      dataIndex: "email",
      width: '15%',
      ...furtherSearchProp('email')

    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '30%',
      ...furtherSearchProp('address')
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      width: '10%',
      ...furtherSearchProp('phone')

    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '10%',
      render: (status: string) => {
        return <Tag color={status === "enable" ? "green" : "red"}>{status.toUpperCase()}</Tag>
      },
      filters: [
        {
          text: 'ENABLE',
          value: 'enable',
        },
        {
          text: 'DISABLE',
          value: 'disable',
        },
      ],
      onFilter: (value: string | number | boolean, record: DataType) => record.status.includes(value.toString()),
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: '15%',
      render: (record: DataType) =>
        <>
          <Tag
            onClick={() => showModal(record)}
            color='blue' style={{ width: "50px", textAlign: "center", cursor: "pointer", marginRight: "15px", marginBottom: "5px" }}>View</Tag>
          <Link to={`/user/edit/${record.key}`}><Tag color='blue' style={{ width: "50px", textAlign: "center", cursor: "pointer" }}>Edit</Tag></Link>
        </>,
    },
  ];



  return (<div style={{ paddingTop: 50 }}>
    <Table
      scroll={{ y: 'calc(100vh - 180px)' }}
      onRow={(record, rowIndex) => {
        return {
          onDoubleClick: () => {
            showModal(record)
          }
        }
      }}

      columns={columns}
      dataSource={data}
      onChange={onChange} />
    {
      open && <PopupViewFormV1
        title={"User information"}
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        data={dateView}
      />
    }

  </div>);

}

export default User;