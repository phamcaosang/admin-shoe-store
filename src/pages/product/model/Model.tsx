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
import { InnerBrand_Model, InnerProductType_Model, ModelModelFull, useDeleteModelMutation, useGetModelsQuery } from '../../../redux/apiSlicers/Model';
import { exposeFilters } from '../../../utils/helper';

const ItemName = "kiểu mẫu"
const RouteName = 'model'

const TableBrandProps = (showModalView: (record: ModelModelFull) => void, showModalDelete: (record: ModelModelFull) => void, data?: ModelModelFull[]): ColumnsType<ModelModelFull> => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const furtherSearchProp = (dataIndex: string): ColumnType<ModelModelFull> => {
    return getColumnSearchProps({ dataIndex, searchedColumn, setSearchedColumn, searchText, setSearchText, searchInput, setSearchInput })
  }

  return [
    {
      title: 'Tên kiểu mẫu',
      dataIndex: 'name',
      width: '20%',
      ...furtherSearchProp('name')
    },
    // {
    //   title: 'Mô tả',
    //   dataIndex: 'description',
    //   width: '30%',
    //   responsive: ['md'],
    //   ...furtherSearchProp('description'),
    //   render: (dsc: string) => {
    //     return <Tooltip title={dsc.slice(0, 500)}>
    //       {dsc.slice(0, 70)}
    //     </Tooltip>
    //   }
    // },
    {
      title: 'Thương hiệu',
      dataIndex: 'brand',
      width: '20%',
      responsive: ['sm'],
      render: (brand: InnerBrand_Model) => {
        return brand?.name
      },
      filters: data && exposeFilters(data.map(item => item.brand.name)),
      onFilter: (value, record: ModelModelFull) => record.brand?.name.includes(value.toString())
    },
    {
      title: 'Phân loại sản phẩm',
      dataIndex: 'productType',
      width: '20%',
      responsive: ['sm'],
      render: (productType: InnerProductType_Model) => {
        return productType.name
      },
      filters: data && exposeFilters(data.map(item => item.productType.name)),
      onFilter: (value, record: ModelModelFull) => record.productType.name.includes(value.toString())
    },
    {
      title: 'Hành động',
      key: 'operation',
      fixed: 'right',
      width: '15%',
      render: (record: ModelModelFull) =>
        <>
          <Viewbtn text="Xem" action={() => showModalView(record)} />
          <Editbtn direction={`/${RouteName}/edit/${record.id}`} text="Sửa" />
          <Deletebtn text='Xóa' action={() => showModalDelete(record)} />
        </>,
    },
  ]

}


const Model: React.FC = () => {
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [dataView, setDataView] = useState<ModelModelFull | null>(null);
  const [deleteModel] = useDeleteModelMutation()
  const { data, isLoading } = useGetModelsQuery()

  const showModalView = (record: ModelModelFull) => {
    setDataView(record)
    setOpenView(true);
  };
  const hideModalView = () => {
    setDataView(null)
    setOpenView(false);
  };

  const showModalDelete = (record: ModelModelFull) => {
    setDataView(record)
    setOpenDelete(true);
  };
  const hideModalDelete = () => {
    setDataView(null)
    setOpenDelete(false);
  };



  return <div>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Createbtn direction={`/${RouteName}/create`} text={`Tạo kiểu mẫu mới`} />
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
      columns={TableBrandProps(showModalView, showModalDelete, data)}
      dataSource={data}
      loading={isLoading}
    />
    {
      openView && <PopupViewFormV1
        title={`${ItemName} information`}
        open={openView}
        onOk={hideModalView}
        onCancel={hideModalView}
        data={{ ...dataView, brand: dataView?.brand.name, productType: dataView?.productType.name }}
      />
    }
    {
      openDelete && <PopupSelectionDeleteItem
        deleteItem={deleteModel}
        itemType={ItemName}
        open={openDelete}
        onCancel={hideModalDelete}
        data={dataView}
      />
    }
  </div>
}

export default Model;

