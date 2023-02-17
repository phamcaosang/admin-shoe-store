import { Bar } from '@ant-design/plots';


export const BarViewProduct = () => {
    const data = [
        {
            type: 'AAAAAA',
            views: 38,
        },
        {
            type: 'BBBBB',
            views: 52,
        },
        {
            type: 'CCCCCC',
            views: 61,
        },
        {
            type: 'DDDDDD',
            views: 145,
        },
        {

            type: 'EEEEEE',
            views: 48,
        },
        {
            type: 'FFFFFF',
            views: 38,
        },
        {
            type: 'GGGGGG',
            views: 38,
        },
        {
            type: 'HHHHHH',
            views: 38,
        }
    ]
    const config = {
        data,
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
        <Bar {...config} />
    </>
}