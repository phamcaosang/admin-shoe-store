import { Table } from "antd"


export const TopWishProduct = () => {
    const dataSource = [
        {
            key: '1',
            sku: "AAB",
            name: 'Mike',
            model: "Adidas X",
            votes: 40
        },
        {
            key: '2',
            sku: "MCD",
            name: 'John',
            model: "Adidas Y",
            votes: 30
        },
        {
            key: '3',
            sku: "BBB",
            name: 'John',
            model: "Adidas Y",
            votes: 30
        },
        {
            key: '4',
            sku: "CCC",
            name: 'John',
            model: "Adidas Y",
            votes: 20
        },
        {
            key: '5',
            sku: "DDD",
            name: 'John',
            model: "Adidas Y",
            votes: 20
        },
        {
            key: '6',
            sku: "EEE",
            name: 'John',
            model: "Adidas Y",
            votes: 15
        },
        {
            key: '7',
            sku: "FFF",
            name: 'John',
            model: "Adidas Y",
            votes: 16
        },
    ];

    const columns = [
        {
            title: "Sku",
            dataIndex: "sku",
            key: 'sku',
            width: "15%"
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: "35%",
        },
        {
            title: 'Kiểu mẫu',
            dataIndex: 'model',
            key: 'model',
            width: "20%"
        },
        {
            title: 'Lượng yêu thích',
            dataIndex: 'votes',
            key: 'votes',
        },
    ];
    return <>
        <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 4 }} />
    </>
}