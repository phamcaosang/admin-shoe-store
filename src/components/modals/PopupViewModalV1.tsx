import React from 'react'
import { Modal, Descriptions, Tag } from 'antd'
import { dateConvertion } from '../../utils/dateAchiever'
import { image } from '@cloudinary/url-gen/qualifiers/source'

interface PopupViewFormType {
  title: string,
  open: boolean,
  onOk: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void),
  onCancel: ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void),
  data: any
}

const dictionary: { [key: string]: string } = {
  'name': 'Tên',
  'description': 'Mô tả',
  'createdAt': 'Ngày tạo',
  'updatedAt': 'Ngày sửa',
  'brand': 'Thương hiệu',
  'productType': 'Phân lo',
  'values': 'Giá trị',
  'images': 'Hình ảnh',
  'image': 'Hình ảnh',
  'products': "Sản phẩm"
}
const mapDic = (item: string) => {
  return dictionary[item] ? dictionary[item] : item
}

function PopupViewFormV1({ title, open, onOk, onCancel, data }: PopupViewFormType) {
  const categorizeAttribute = (item: string) => {
    if (item === "id" || item === "key" || item === "thumbnail" || item === "images") {
      return <>
      </>
    }

    if (item === "description") {
      return <>
      </>
    }
    if (item === "products") {
      return <Descriptions.Item label={mapDic(item)}>
        <div>
          {
            data[item].map((i: { id: string, name: string }) => {
              return <div style={{ fontSize: 12, marginBottom: 10 }}>{i.name}</div>
            })
          }
        </div>
      </Descriptions.Item>
    }
    if (item === "image") {
      console.log(data[item])
      return <Descriptions.Item label={mapDic(item)}>
        {
          data[item] ?
            <img src={data[item]} alt="alt" style={{ width: 50, height: 50, objectFit: 'cover' }} /> : <></>
        }
      </Descriptions.Item>
    }
    if (item === "values") {
      return <Descriptions.Item label={mapDic(item)}>
        {data[item].map((item: any) => <Tag>{item.value}</Tag>)}
      </Descriptions.Item>
    }

    if (item === "createdAt" || item === "updatedAt") {
      return <Descriptions.Item label={mapDic(item)}>{dateConvertion(data[item])}</Descriptions.Item>
    }

    return <Descriptions.Item label={mapDic(item)}>{data[item]}</Descriptions.Item>
  }


  return (
    <div>
      <Modal
        title={title}
        open={open}
        onOk={onOk}
        onCancel={onCancel}
        okText="OK"
        cancelText="Cancel"
        width={800}
      >
        <Descriptions>
          {
            Object.keys(data).map((item: string) => <>
              {categorizeAttribute(item)}
            </>)
          }
        </Descriptions>

      </Modal>
    </div>
  )
}

export default PopupViewFormV1;