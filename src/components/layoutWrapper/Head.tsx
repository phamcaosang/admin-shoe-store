import { Layout, Avatar, Dropdown, Button, Space } from "antd"
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
const { Header } = Layout;

const Head: React.FC = () => {


    const items: MenuProps['items'] = [
        {
            label: 'Vietnames',
            key: 'VN',
        },
        {
            label: 'English',
            key: 'EN',
        },
    ];

    const menuProps = {
        items,
        onClick: () => { },
    };

    return <div>
        <Header className="site-layout-background" style={{ padding: "0 40px", color: "white", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", margin: "18px" }}>
                <Avatar src={"https://joeschmoe.io/api/v1/random"}
                    style={{ border: "1px solid white", cursor: "pointer", marginRight: "8px" }}
                />
                <Dropdown menu={menuProps}>
                    <Button style={{ backgroundColor: "transparent", color: "white" }}>
                        <Space>
                            VN
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </div>
        </Header>
    </div>
}

export default Head;
