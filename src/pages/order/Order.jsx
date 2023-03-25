import { Table, Tag, Modal, Descriptions, Button, Select, InputNumber, message, Input, Form, Spin, Radio } from "antd"
import { useEffect, useState } from "react";
import moment from "moment"
import { getColumnSearchProps } from "../../components/formInputs/SearchInputColumn";
import { useGetOrdersQuery, useUpdateOrderMutation } from "../../redux/apiSlicers/Order";
import { useGetProductsNoGroupQuery, useGetProductsQuery } from "../../redux/apiSlicers/Product";
import { notifyError, notifySuccess } from "../../utils/alert";
import { exposeFilters } from "../../utils/helper";
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
export default function Order() {
  const { data, isLoading } = useGetOrdersQuery()
  const [openModal, setOpenModal] = useState(false)
  const [dataOrder, setDataOrder] = useState(null)
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const furtherSearchProp = (dataIndex) => {
    return getColumnSearchProps({ dataIndex, searchedColumn, setSearchedColumn, searchText, setSearchText, searchInput, setSearchInput })
  }
  const statusDictionary = {
    1: "Chờ",
    2: "Đã nhận",
    3: "Đã gửi",
    "-1": "Hủy"
  }
  const columns = [
    {
      title: "Mã đơn",
      dataIndex: "id",
      width: "10%",
      ...furtherSearchProp("id")
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      width: "10%",
      ...furtherSearchProp("name")

    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: "10%",
      ...furtherSearchProp("phone")

    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: "20%",
      ...furtherSearchProp("address")

    },
    {
      title: "Tổng giá trị",
      dataIndex: "totalPrice",
      width: "10%",
      render: (value) => {
        return (
          <>
            {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ
          </>)
      }
    },
    {
      title: "Tình trạng",
      dataIndex: "stage",
      width: "10%",
      filters: data && exposeFilters(data.map(item => statusDictionary[item.stage])),
      onFilter: (value, record) => statusDictionary[record.stage] === value,
      render: (value) => {
        return <>
          {value === 1 && <Tag color="blue">Chờ</Tag>}
          {value === 2 && <Tag color="gold">Đã nhận</Tag>}
          {value === 3 && <Tag color="green">Đã gửi</Tag>}
          {value === -1 && <Tag color="red">Hủy</Tag>}
        </>
      }
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      width: "10%",
      render: (value) => {
        return (
          <>
            {moment(value).format("DD/MM/YYYY hh:mm:ss")}
          </>)
      }
    },
    {
      title: "Ngày sửa",
      dataIndex: "updateAt",
      width: "10%",
      render: (value) => {
        return (
          <>
            {moment(value).format("DD/MM/YYYY hh:mm:ss")}
          </>)
      }
    },
    {
      title: "Hành động",
      dataIndex: "action",
      width: "10%",
      render: (value, record) =>
        <>
          <Tag onClick={() => { setDataOrder(record); setOpenModal(true); }}
            color='blue' style={{ cursor: "pointer", marginRight: "15px", marginBottom: "5px" }}>Chi tiết</Tag>
        </>,
    },
  ]

  const [form] = Form.useForm()
  const [updateOrder, { isLoading: loadingEdit }] = useUpdateOrderMutation()

  return (
    <div>
      <Table columns={columns} dataSource={data} loading={isLoading} pagination={{ pageSize: 10 }}
        rowKey={record => record.id}
        onRow={(record, _) => {
          return {
            onDoubleClick: () => {
              setDataOrder(record);
              setOpenModal(true);
            }
          }
        }}
      />
      <Modal open={openModal} title="Thông tin đơn hàng" style={{ top: 15 }} width={"85%"}
        onCancel={() => {
          setTimeout(() => {
            setOpenModal(false)
          }, 50)
          setDataOrder(prev => {
            return {
              ...prev,
              new: Math.random()
            }
          })
          setDataOrder(null)

        }}
        footer={[
          <Button loading={loadingEdit} onClick={() => setDataOrder(prev => {
            return {
              ...prev,
              new: Math.random()
            }
          })} >Trở về giá trị ban đầu</Button>,
          <Button type="primary" onClick={() => form.submit()}>Lưu thay đổi</Button>
        ]}>
        {dataOrder &&
          <DescriptionOrder dataOrder={dataOrder} form={form} updateOrder={updateOrder} loadingEdit={loadingEdit} setDataOrder={setDataOrder} />
        }
      </Modal>
    </div >
  )
}



function DescriptionOrder({ dataOrder, form, updateOrder, loadingEdit, setDataOrder }) {
  const [data, setData] = useState(dataOrder)
  const [selectedStatus, setSelectedStatus] = useState(dataOrder.stage)
  const handleChangeProduct = (val, record, name) => {
    console.log(val)
    if (name === "quantity" && val === 0) {
      message.warn("Sản phẩm có số lượng bằng 0 sẽ bị xóa khi bấm lưu thay đổi", 3)
    }
    setData(prev => {
      return {
        ...prev,
        products: prev.products.map(i => {
          if (i.sku === record.sku) {
            return {
              ...i,
              [name]: val
            }
          }
          return i
        })
      }
    })
  }
  const handleChangeOrderInfo = ({ name, value }) => {
    setData(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  }
  const columns = [
    {
      title: "SKU",
      dataIndex: "sku",
      width: "10%",
    },
    {
      title: "Tên",
      dataIndex: "name",
      width: "20%",
    },
    {
      title: "Màu",
      dataIndex: "color",
      width: "10%",
    },
    {
      title: "Kích thước",
      dataIndex: "size",
      width: "10%",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      width: "10%",
      render: (value, record) => {
        return <InputNumber min={0} max={100} value={value} onChange={(val) => handleChangeProduct(val, record, "quantity")} />
      }
    },
    {
      title: "Giá niêm yết",
      dataIndex: "oldPrice",
      width: "15%",
      render: (value) => {
        return (
          <>
            {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ
          </>)
      }
    },
    {
      title: "Giá sau khi giảm",
      dataIndex: "newPrice",
      width: "15%",
      render: (value, record) => {
        return (
          <>
            <InputNumber
              style={{ width: 120 }}
              min={0}
              value={value}
              onChange={(val) => handleChangeProduct(val, record, "newPrice")}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
            /> đ
          </>)
      }
    },

  ]
  const handleSubmitEdit = (values) => {
    updateOrder({ ...data, stage: selectedStatus }).unwrap().then(res => {
      notifySuccess("Đơn hàng đã được cập nhật")
      setDataOrder({ ...data, stage: selectedStatus })
    }).catch(err => {
      console.log(err.data.message)
      notifyError(`${err.data.message}`)
    })
  }
  useEffect(() => {
    setData(dataOrder)
    setSelectedStatus(dataOrder.stage)
  }, [JSON.stringify(dataOrder)])


  const [modalOpen, setModalOpen] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([])

  const handleAddProduct = () => {
    for (let item of selectedRows) {
      setData(prev => {
        if (prev.products.find(i => i.sku === item.sku)) {
          return prev
        }
        return {
          ...prev,
          products: [{ ...item, quantity: 1 }, ...prev.products]
        }
      })
    }
    setSelectedRowKeys([])
    setSelectedRows([])
    setModalOpen(false)

  }
  function StageRender({ stage }) {
    const statusDictionary = {
      1: "Chờ",
      2: "Đã nhận",
      3: "Đã gửi",
      "-1": "Hủy"
    }
    const colorDictionary = {
      1: "waiting",
      2: "received",
      3: "sent",
      "-1": "cancel"
    }
    return <span className={`btn_select ${colorDictionary[stage]}`}>
      <Radio.Button value={stage} checked={selectedStatus === stage} > {statusDictionary[stage]}</Radio.Button>
    </span>
  }


  return (
    <>
      <Spin spinning={loadingEdit}>
        <Form onFinish={handleSubmitEdit} form={form} className="selectStage" preserve={false}>
          <Descriptions column={3} bordered layout="horizontal" labelStyle={{ textAlign: "center", width: 200 }} contentStyle={{ textAlign: "center" }}>
            <Descriptions.Item label={"Mã đơn hàng"} span={1} >
              {data.id}
            </Descriptions.Item>
            <Descriptions.Item label={"Tên người nhận"} span={1} >
              <Input value={data.name} name="name" onChange={(e) => handleChangeOrderInfo(e.target)} />
            </Descriptions.Item>
            <Descriptions.Item label={"Số điện thoại"} span={1} >
              <Input value={data.phone} name="phone" onChange={(e) => handleChangeOrderInfo(e.target)} />
            </Descriptions.Item>
            <Descriptions.Item label={"Địa chỉ"} span={3} >
              <Input value={data.address} name="address" onChange={(e) => handleChangeOrderInfo(e.target)} width={300} />
            </Descriptions.Item>
            <Descriptions.Item label={"Ghi chú"} span={3} >
              <Input disabled value={data.note} name="note" />
            </Descriptions.Item>
          </Descriptions>
          <div className="footerDescription">
            <Descriptions column={2} bordered layout="horizontal" labelStyle={{ textAlign: "center", width: 200 }} contentStyle={{ textAlign: "center" }}
            >
              <Descriptions.Item label={"Tình trạng"} span={1} >
                {data.stage === 1 && <Tag color="blue" style={{ width: "100%", padding: 5, textAlign: "center" }}>Chờ xử lý</Tag>}
                {data.stage === 2 && <Tag color="gold" style={{ width: "100%", padding: 5, textAlign: "center" }}>Đã nhận</Tag>}
                {data.stage === 3 && <Tag color="green" style={{ width: "100%", padding: 5, textAlign: "center" }}>Đã gửi</Tag>}
                {data.stage === -1 && <Tag color="red" style={{ width: "100%", padding: 5, textAlign: "center" }}>Đã hủy</Tag>}
              </Descriptions.Item>
              <Descriptions.Item span={1}>
                <Radio.Group value={selectedStatus} size="large" buttonStyle="solid" name="formselectstage"
                  onChange={(e) => setSelectedStatus(e.target.value)}>
                  {
                    data.stage === 1 && [1, 2, 3, -1].map(i => <StageRender stage={i} key={i} />)
                  }
                  {
                    data.stage === 2 && [2, 3, -1].map(i => <StageRender stage={i} key={i} />)
                  }
                  {
                    data.stage === 3 && [3, -1].map(i => <StageRender stage={i} key={i} />)
                  }
                  {
                    data.stage === -1 && [-1, 3].map(i => <StageRender stage={i} key={i} />)
                  }

                </Radio.Group>
              </Descriptions.Item>

            </Descriptions>
          </div>

          <Button type="primary" style={{ marginBottom: 10, marginTop: 10 }} onClick={() => setModalOpen(true)}>Thêm sản phẩm</Button>
          <Table
            rowKey={record => record.id}
            bordered={true}
            pagination={{ pageSize: 5 }}
            footer={() => <div style={{ textAlign: "right" }}>
              <span style={{ marginRight: 10, fontSize: 20, fontWeight: "bold" }}>
                Tổng giá trị:
              </span >
              <span style={{ fontSize: 20, fontWeight: "bold", textDecoration: "underline" }}>
                {data.products.reduce((a, b) => a + b["quantity"] * b["newPrice"], 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ
              </span>
            </div>
            }
            dataSource={data.products} columns={columns} />
        </Form>
      </Spin>
      <Modal title="Thêm sản phẩm" width={1580}
        onCancel={() => setModalOpen(false)}
        open={modalOpen}
        footer={[<Button onClick={() => setModalOpen(false)}>Đóng</Button>, <Button type="primary" onClick={() => handleAddProduct()}>Thêm sản phẩm</Button>]}
      >
        <TableProduct selectedRowKeys={selectedRowKeys} setSelectedRowKeys={setSelectedRowKeys} setSelectedRows={setSelectedRows} />
      </Modal>
    </>

  )
}

function TableProduct({ selectedRowKeys, setSelectedRowKeys, setSelectedRows }) {
  const { data: productData, isLoading, isFetching, refetch } = useGetProductsNoGroupQuery(undefined, {
    selectFromResult: ({ data, isLoading, isFetching }) => {
      return {
        isLoading,
        isFetching,
        data: data
      }
    }
  })
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const furtherSearchProp = (dataIndex) => {
    return getColumnSearchProps({ dataIndex, searchedColumn, setSearchedColumn, searchText, setSearchText, searchInput, setSearchInput })
  }
  const columns = [
    {
      title: 'Sku',
      dataIndex: 'sku',
      width: '15%',
      ...furtherSearchProp('sku')
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      width: '25%',
      ...furtherSearchProp('name')
    },
    {
      title: 'Màu',
      dataIndex: 'color',
      width: '10%',
    },
    {
      title: 'Kích thước',
      dataIndex: 'size',
      width: '10%',
    },
    {
      title: 'Giá cũ',
      dataIndex: 'oldPrice',
      width: '15%',
      render: (value) => {
        return (
          <>
            {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ
          </>)
      }
    },
    {
      title: 'Giá mới',
      dataIndex: 'newPrice',
      width: '15%',
      render: (value) => {
        return (
          <>
            {value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} đ
          </>)
      }
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      width: '10%',
    },
  ]
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
      setSelectedRows(selectedRows)
    },
  };
  return <>
    <Button type="primary" style={{ marginBottom: 10 }} onClick={() => refetch()}>Tải lại dữ liệu</Button>
    <Table loading={isLoading || isFetching}
      columns={columns}
      rowSelection={{
        hideSelectAll: true,
        selectedRowKeys,
        type: "checkbox",
        ...rowSelection,
      }}
      rowKey={record => record.sku}
      dataSource={productData}
      pagination={{ pageSize: 5 }}
    />
  </>
}