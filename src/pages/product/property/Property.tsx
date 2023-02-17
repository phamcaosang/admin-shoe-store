import React, { useState } from 'react'
import { Space, Table, Tabs, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ColumnType } from 'antd/es/table';
import PopupViewFormV1 from '../../../components/modals/PopupViewModalV1';
import { Editbtn } from '../../../components/buttons/Editbtn';
import { Viewbtn } from '../../../components/buttons/Viewbtn';
import { Createbtn } from '../../../components/buttons/Createbtn';
import { Deletebtn } from '../../../components/buttons/Deletebtn';
import { PopupSelectionDeleteItem } from '../../../components/modals/PopupSelectionModals';
import { getColumnSearchProps } from '../../../components/formInputs/SearchInputColumn';
import { InnerProp_ProductType, PropertyModelForm, PropertyModelFull, PropertyValue, useDeletePropertyMutation, useGetPropertysQuery } from '../../../redux/apiSlicers/Property';
import { exposeFilters } from '../../../utils/helper';

const ItemName = "thuộc tính"

const TablePropertyProps = (showModalView: (record: PropertyModelFull) => void, showModalDelete: (record: PropertyModelFull) => void, core: boolean, data?: PropertyModelFull[]): ColumnsType<PropertyModelFull> => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const furtherSearchProp = (dataIndex: string): ColumnType<PropertyModelFull> => {
    return getColumnSearchProps({ dataIndex, searchedColumn, setSearchedColumn, searchText, setSearchText, searchInput, setSearchInput })
  }

  return [
    {
      title: 'Tên thuộc tính',
      dataIndex: 'name',
      width: '20%',
      ...furtherSearchProp('name')
    },
    {
      title: 'Phân loại sản phẩm',
      dataIndex: 'productType',
      width: '15%',
      responsive: ['md'],
      filters: data && exposeFilters(data.map(item => item.productType.name)),
      onFilter: (value, record: PropertyModelFull) => record.productType.name.includes(value.toString()),
      render: (record: InnerProp_ProductType) => {
        return record.name
      }
    },
    {
      title: 'Giá trị',
      dataIndex: 'values',
      width: '45%',
      responsive: ['lg'],
      render: (record: PropertyValue[]) => {
        return <div>{record?.map((item: PropertyValue) => <Tag>{item.value}</Tag>)}</div>
      }
    },
    {
      title: 'Hành động',
      key: 'operation',
      fixed: 'right',
      width: '20%',
      render: (record: PropertyModelFull) =>
        <>
          <Viewbtn text="View" action={() => showModalView(record)} />
          {/* <Editbtn direction={`/property/edit/${record.id}${core && '?name=core'}`} text="Edit" /> */}
          <Deletebtn text='Delete' action={() => showModalDelete(record)} />
        </>,
    },
  ]

}

interface PropertyTableType {
  core: boolean
}

const PropertyTable: React.FC<PropertyTableType> = ({ core }) => {
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [dataView, setDataView] = useState<PropertyModelFull | null>(null);
  const { data, isLoading } = useGetPropertysQuery()

  const [deleteBrand] = useDeletePropertyMutation()

  const showModalView = (record: PropertyModelFull) => {
    setDataView(record)
    setOpenView(true);
  };
  const hideModalView = () => {
    setDataView(null)
    setOpenView(false);
  };

  const showModalDelete = (record: PropertyModelFull) => {
    setDataView(record)
    setOpenDelete(true);
  };
  const hideModalDelete = () => {
    setDataView(null)
    setOpenDelete(false);
  };
  const dataSource = data?.filter((item: PropertyModelFull) => core ? ["size", "color"].includes(item.name) : !["size", "color"].includes(item.name));
  console.log(dataSource)
  return <>
    <Table
      scroll={{ y: 'calc(100vh - 180px)' }}
      onRow={(record, rowIndex) => {
        return {
          onDoubleClick: () => {
            showModalView(record)
          }
        }
      }}
      columns={TablePropertyProps(showModalView, showModalDelete, core, dataSource)}
      dataSource={dataSource}
      loading={isLoading}
    />
    {
      openView && <PopupViewFormV1
        title={`${ItemName} information`}
        open={openView}
        onOk={hideModalView}
        onCancel={hideModalView}
        data={{ ...dataView, productType: dataView?.productType.name }}
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
  </>
}

const items = new Array(1).fill(null).map((_, i) => {
  const id: number = i + 1;
  return {
    label: id === 1 ? "Core Property" : "Specification Property",
    key: id.toString(),
    children: (
      <>
        {id === 1 ? <PropertyTable core={true} /> : <PropertyTable core={false} />}
      </>
    ),
  };
});

const Property: React.FC = () => {

  return <div>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Space>
        <Createbtn direction={"/property/create?name=core"} text={"Tạo thuộc tính mới"} />
        {/* <Createbtn direction={"/property/create?name=core"} text={"Add New Core Property"} />
        <Createbtn direction={"/property/create"} text={"Add New Specification Property"} /> */}
      </Space>
    </div>
    <div className="card-container">
      <Tabs type="card" items={items} />
    </div>
  </div>

}

export default Property;
