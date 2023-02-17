import React from 'react';
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
// import { isNumeric, toTitleCase } from '../utils/helper';


const handleSuit = (item: string) => {
    const mapper: { [key: string]: string } = {
        "user": "Người dùng",
        "collection": "Bộ sưu tập",
        "brand": "Thương hiệu",
        "type": "Phân loại",
        "model": "Kiểu mẫu",
        "product": "Sản phẩm",
        "property": "Thuộc tính",
        "discount": "Giảm giá",
        "homepage": "Trang chủ",
        "contact": "Liên hệ",
        "create": "Tạo mới",
        "edit": "Chỉnh sửa",
        "banner": "Banner"

    }
    return mapper[item] || item
}

export const BreadCrumbCustom = () => {
    const location = useLocation()
    const pathSnippets = location.pathname.split("/").filter(i => i && i.length < 30 && i !== "dashboard").map(item => {
        return {
            value: item,
            url: (item === "create" || item === "edit") ? null : item
        }
    });

    const path = [
        {
            value: "Trang chủ",
            url: "/dashboard"
        },
        ...pathSnippets
    ]
    return <div style={{ position: "absolute" }} className="BreadCumbWrapper">
        {path.length > 1 &&
            <Breadcrumb>
                {
                    path.map(item => {
                        return item.url ?
                            <Breadcrumb.Item key={item.url}>
                                <Link to={item.url}>{handleSuit(item.value)}</Link>
                            </Breadcrumb.Item>
                            :
                            <Breadcrumb.Item key={item.url}><span>{handleSuit(item.value)}</span></Breadcrumb.Item>
                    })
                }
            </Breadcrumb>
        }
    </div >
}