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
import { Link, useNavigate } from "react-router-dom";
import { keyLink } from './LinkNav';
import UserSetting from "../modals/UserSettingDrawer";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
const { Sider } = Layout;


type MenuItem = Required<MenuProps>['items'][number];

export const items: MenuItem[] = [
  {
    key: "Home",
    icon: <PieChartOutlined />,
    label: <Link to="/dashboard">Trang chủ</Link>
  },
  {
    key: "Sản phẩm",
    label: "Sản phẩm",
    icon: <InboxOutlined />,
    children: [
      {
        key: "Bộ sưu tập",
        label: <Link to="/collection">Bộ sưu tập</Link>
      },
      {
        key: "Thương hiệu",
        label: <Link to="/brand">Thương hiệu</Link>
      },
      {
        key: "Phân loại",
        label: <Link to="/type">Phân loại</Link>
      },
      {
        key: "Kiểu mẫu",
        label: <Link to="/model">Kiểu mẫu</Link>
      },
      {
        key: "Sản phẩm",
        label: <Link to="/product">Sản phẩm</Link>
      },
      {
        key: "Thuộc tính",
        label: <Link to="/property">Thuộc tính</Link>
      },
    ]
  },
  {
    key: "Order",
    icon: <AiOutlineShoppingCart />,
    label: <Link to="/order">Đơn hàng</Link>
  },

  {
    key: "Trang",
    icon: <MdWeb />,
    label: "Trang",
    children: [
      {
        key: "Banner",
        label: <Link to="/banner">Banner</Link>
      },
      {
        key: "Thông tin",
        label: <Link to="/info">Thông tin</Link>
      },
      {
        key: "Liên hệ",
        label: <Link to="/contact">Liên hệ</Link>
      },
      {
        key: "Tin tức",
        label: <Link to="/blog">Tin tức</Link>
      },
      {
        key: "Chủ đề",
        label: <Link to="/category">Chủ đề</Link>
      },
    ]
  },
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

  const { avatar } = useSelector((state: RootState) => state.auth)


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

      <Avatar src={avatar || "https://api.multiavatar.com/Ki.png"}
        style={{ border: "2px solid white", cursor: "pointer", width: 50, height: 50 }}
        onClick={(() => setOpen(true))}
      />
    </div>
    <Menu theme="dark" defaultSelectedKeys={getKeyActive()} mode="inline" items={items} onClick={e => handleNavigate(e.key)} />
    <UserSetting open={open} onCancel={hideModal} />
  </Sider>
}

export default Sidebar;
