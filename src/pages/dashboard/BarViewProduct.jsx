import { Bar } from '@ant-design/plots';
import { useGetProductsQuery } from '../../redux/apiSlicers/Product';


export const BarViewProduct = () => {
    const { data: products, isLoading, isSuccess } = useGetProductsQuery(undefined, {
        selectFromResult: ({ data, isLoading, isSuccess }) => ({
            data: data?.map(({ view, name }) => { return { views: view, type: name } })?.sort((a, b) => b.views - a.views)?.slice(0, 8),
            isLoading,
            isSuccess
        })
    })
    const config = {
        data: isSuccess ? products : [],
        xField: 'views',
        yField: 'type',
        barWidthRatio: 0.8,
        seriesField: 'type',
        meta: {
            type: {
                alias: 'XXXX',
            },
            views: {
                alias: 'Lượt xem',
            },
        },
    };

    return <>
        <Bar {...config} loading={isLoading} />
    </>
}