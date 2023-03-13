import React, { useState } from 'react'
import { Table, Input, Button, Tag } from 'antd';
import { dataType, TypeType } from "../../../utils/propsDummy/BrandProps"
import type { ColumnsType } from 'antd/es/table';
import { Link } from "react-router-dom"
import { TitleComponent } from '../../../components/Title';
import { BrandInMoldel, dataModel, ModelType, TypeInModel } from '../../../utils/propsDummy/ModelProps';
import { Createbtn } from '../../../components/buttons/Createbtn';
import { PopupSelectionDeleteItem, PopupSelectionModal } from '../../../components/modals/PopupSelectionModals';
import { ProductModelFull, useDeleteProductBySkuMutation, useGetProductsQuery } from '../../../redux/apiSlicers/Product';
import { getColumnSearchProps } from '../../../components/formInputs/SearchInputColumn';
import { ColumnType } from 'antd/lib/table';
import { exposeFilters } from '../../../utils/helper';
import { Deletebtn } from '../../../components/buttons/Deletebtn';
const ItemName = "sản phẩm"


const Product: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [dataView, setDataView] = useState<ProductModelFull | null>(null);
  const [select, setSelect] = useState(false);
  const [deleteProductBySku] = useDeleteProductBySkuMutation()

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const furtherSearchProp = (dataIndex: string): ColumnType<ProductModelFull> => {
    return getColumnSearchProps({ dataIndex, searchedColumn, setSearchedColumn, searchText, setSearchText, searchInput, setSearchInput })
  }

  const { data: productData, isLoading } = useGetProductsQuery()

  const showModal = (record: ProductModelFull) => {
    setDataView(record)
    setOpen(true);
  };

  const hideModal = () => {
    setDataView(null)
    setOpen(false);
  };

  const [openDelete, setOpenDelete] = useState(false);


  const showModalDelete = (record: ProductModelFull) => {
    setDataView(record)
    setOpenDelete(true);
  };
  const hideModalDelete = () => {
    setDataView(null)
    setOpenDelete(false);
  };

  const columns: ColumnsType<ProductModelFull> = [

    {
      title: 'Sku',
      dataIndex: 'sku',
      width: '10%',
      ...furtherSearchProp('sku')
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      width: '25%',
      ...furtherSearchProp('name')
    },
    {
      title: "Kiểu mẫu",
      dataIndex: 'model',
      width: "10%",
      render: (value: any) => {
        return <>
          {value.name}
        </>
      },
      filters: productData && exposeFilters(productData.map(item => item.model?.name)),
      onFilter: (value, record: ProductModelFull) => record.model ? record.model.name.includes(value.toString()) : false
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      width: '10%',
      render: (values: any) => {
        return `${values}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }
    },
    {
      title: "Màu",
      dataIndex: 'values',
      width: "25",
      render: (values: any) => {
        return values.map((i: any) => i.propertyValue).join(", ")
      }
    },
    {
      title: 'Hành động',
      key: 'operation',
      fixed: 'right',
      width: '20%',
      render: (value: any, record: ProductModelFull, index: number) =>
        <>
          {/* <Tag
            onClick={() => showModal(record)}
            color='blue' style={{ width: "50px", textAlign: "center", cursor: "pointer", marginBottom: 5, marginRight: 0 }}>View</Tag> */}
          <Link to={`/product/edit/${record.sku}/?type=${record.model?.productType?.id}`}><Tag color='blue' style={{ width: "50px", textAlign: "center", cursor: "pointer", margin: "0 15px 0 15px" }}>Sửa</Tag></Link>
          <Deletebtn text='Xóa' action={() => showModalDelete(record)} />
          {/* <Tag color='blue' style={{ width: "50px", textAlign: "center", cursor: "pointer", marginBottom: 5 }}>Clone</Tag> */}
        </>,
    },
  ]
  return <div>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      {/* <TitleComponent text="Product" level={2} /> */}
      <Button
        type="primary"
        style={{ marginBottom: "15px" }}
        onClick={() => setSelect(true)}
      >Tạo Sản Phẩm</Button>

    </div>
    <PopupSelectionModal title="Chọn loại sản phẩm" open={select} onCancel={() => setSelect(false)} />
    <Table
      loading={isLoading}
      columns={columns} dataSource={productData}
      rowKey={row => row.id}
    />
    {
      openDelete && <PopupSelectionDeleteItem
        field={"sku"}
        deleteItem={deleteProductBySku}
        itemType={ItemName}
        open={openDelete}
        onCancel={hideModalDelete}
        data={dataView}
      />
    }
  </div>
}

export default Product;

