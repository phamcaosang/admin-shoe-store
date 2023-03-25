import { Table } from "antd"
import { useGetProductsQuery } from "../../redux/apiSlicers/Product";


export const TopWishProduct = () => {
    const { data: products, isLoading, isSuccess } = useGetProductsQuery(undefined, {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            data: data?.map(({ sku, name, model, favorites }) => {
                return {
                    sku, name, favorites, model: model.name
                }
            }).sort((a, b) => b.favorites - a.favorites),
            isLoading,
            isSuccess
        })
    })

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
            dataIndex: 'favorites',
            key: 'favorites',
        },
    ];
    return <>
        <Table dataSource={products} columns={columns} pagination={{ pageSize: 3 }} />
    </>
}