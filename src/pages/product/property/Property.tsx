import React, { useEffect, useState } from 'react'
import { Button, Form, Input, Modal, Space, Table, Tabs, Tag, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ColumnType } from 'antd/es/table';
import PopupViewFormV1 from '../../../components/modals/PopupViewModalV1';
import { Editbtn } from '../../../components/buttons/Editbtn';
import { Viewbtn } from '../../../components/buttons/Viewbtn';
import { Createbtn } from '../../../components/buttons/Createbtn';
import { Deletebtn } from '../../../components/buttons/Deletebtn';
import { PopupSelectionDeleteItem } from '../../../components/modals/PopupSelectionModals';
import { getColumnSearchProps } from '../../../components/formInputs/SearchInputColumn';
import { InnerProp_ProductType, PropertyModelForm, PropertyModelFull, PropertyValue, useDeletePropertyMutation, useGetPropertysQuery, useUpdatePropertyValueMutation } from '../../../redux/apiSlicers/Property';
import { exposeFilters } from '../../../utils/helper';
import { notifyError, notifySuccess } from '../../../utils/alert';


const Property: React.FC = () => {
  const [updatePropertyValue, { isLoading: loadingDelete }] = useUpdatePropertyValueMutation()
  const [form] = Form.useForm()

  const { data, isLoading } = useGetPropertysQuery()
  const [dataProperty, setDataProperty] = useState<PropertyValue>()
  const [isShow, setIsShow] = useState(false)

  const TablePropertyProps = (data?: PropertyModelFull[]): ColumnsType<PropertyModelFull> => {
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
        render: (values: PropertyValue[], record: PropertyModelFull) => {
          return <div>{values?.map((item: PropertyValue) => <Tag key={item.id} onClick={() => {
            setIsShow(true);
            setDataProperty(item)
            form.setFieldValue("producttype", record.productType.name)
            form.setFieldValue("propertyname", record.name)
            form.setFieldValue("propertyvalue", item.value)
          }} style={{ cursor: "pointer" }}>{item.value}</Tag>)
          }</div>
        }
      },

    ]

  }

  const handleEditProperty = (values: any) => {
    dataProperty?.id && updatePropertyValue({
      propertyValueId: dataProperty.id,
      value: values.propertyvaluenew
    }).unwrap().then(res => {
      notifySuccess(`Giá trị thuộc tính cập nhập thành công`)
      form.resetFields()
      setIsShow(false)
    }).catch(err => {
      console.log(err)
      notifyError("Cập nhật thất bại, thử lại sau")
    })
  }


  return <div>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Space>
        <Createbtn direction={"/property/create?name=core"} text={"Thêm thuộc tính"} />
      </Space>
    </div>
    <div className="card-container">
      <Table
        scroll={{ y: 'calc(100vh - 180px)' }}
        columns={TablePropertyProps(data)}
        dataSource={data}
        loading={isLoading}
        rowKey={record => record.id}
      />
    </div>
    <Modal title="Sửa giá trị thuộc tính" open={isShow} closable={false} width={360}
      footer={
        [
          <Button key="close" onClick={() => setIsShow(false)}>Đóng</Button>,
          <Button key="Lưu" type='primary' onClick={() => form.submit()} loading={loadingDelete}>Lưu</Button>,
        ]
      }
    >
      <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} form={form} onFinish={handleEditProperty}>
        <Form.Item label="Thuộc tính" name="propertyname">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Loại sản phẩm" name="producttype">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Giá trị" name="propertyvalue">
          <Input disabled />
        </Form.Item>
        <Form.Item label="Giá trị mới" name="propertyvaluenew" rules={[{ required: true, message: "Vui lòng nhập thông tin" }]}>
          <Input onChange={(e) => {
            console.log(e.target.value.trim().toUpperCase())
            form.setFieldValue("propertyvaluenew", e.target.value.trim().toUpperCase())
          }} />
        </Form.Item>
      </Form>

    </Modal>
  </div >

}

export default Property;
