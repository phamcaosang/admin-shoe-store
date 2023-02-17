import { Layout, Avatar, Menu, MenuProps } from "antd"
import {
  PieChartOutlined,
  UserOutlined,
  EditOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdWeb } from "react-icons/md"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { keyLink } from './LinkNav';
import UserSetting from "../modals/UserSettingDrawer";
const { Sider } = Layout;


function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem;
}

type MenuItem = Required<MenuProps>['items'][number];

export const items: MenuItem[] = [
  getItem('Trang chủ', '1', <PieChartOutlined />),
  // getItem('Người dùng', '2', <UserOutlined />),
  getItem('Sản phẩm', 'sub1', <InboxOutlined />, [
    getItem('Bộ sưu tập', '3'),
    getItem('Thương hiệu', '4'),
    getItem('Phân loại', '5'),
    getItem('Kiểu mẫu', '5.5'),
    getItem('Sản phẩm', '6'),
    getItem('Thuộc tính', '6.1'),
    // getItem('Store', '6.5'),
    // getItem('Giảm giá', '7'),
  ]),
  // getItem('Order', '8', <AiOutlineShoppingCart />),
  // getItem('Blog', '9', <EditOutlined />),
  getItem('Trang', 'sub2', <MdWeb />, [
    getItem('Banner', 10),
    getItem('Liên hệ', 11),
    // getItem('Contact', 12)
  ]),
];


const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(true);
  const [open, setOpen] = useState(false);
  const hideModal = () => {
    setOpen(false);
  };

  const handleNavigate = (num: string) => {
    keyLink[num] && navigate(keyLink[num])
  }

  const getKeyActive = () => {
    const matchedKeys = Object.entries(keyLink).find(item => window.location.pathname.includes(item[1]))
    return matchedKeys ? [matchedKeys[0]] : ["0"]
  }

  return <Sider
    collapsible
    collapsed={collapsed}
    width={170}
    collapsedWidth={65}
    onCollapse={value => setCollapsed(value)}>
    {/* <div className="logo" /> */}
    <div
      style={{ display: "flex", justifyContent: "center", margin: "15px 0" }}
    >

      <Avatar src="https://api.multiavatar.com/Ki.png"
        style={{ border: "2px solid white", cursor: "pointer", width: 50, height: 50 }}
        onClick={(() => setOpen(true))}
      />
    </div>
    <Menu theme="dark" defaultSelectedKeys={getKeyActive()} mode="inline" items={items} onClick={e => handleNavigate(e.key)} />
    <UserSetting open={open} onCancel={hideModal} />
  </Sider>
}

export default Sidebar;
