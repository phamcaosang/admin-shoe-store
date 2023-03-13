import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import React, { useState, useEffect } from 'react';
import { useGetProductsQuery } from '../../redux/apiSlicers/Product';


export const PieProduct = () => {
    const { data: productType, isLoading } = useGetProductsQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => ({
            data: data?.map(i => {
                return {
                    sku: i.sku,
                    productType: i.model.productType.name
                }
            })?.reduce((p, c) => {
                var name = c.productType;
                if (!p.hasOwnProperty(name)) {
                    p[name] = 0;
                }
                p[name]++;
                return p;
            }, {}),
            isLoading
        })
    })

    const config = {
        legend: false,
        appendPadding: 40,
        data: !productType ? [] : Object.entries(productType).map(i => { return { value: i[1], type: i[0] } }),
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 14,
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                },
                content: 'Phân Loại Sản Phẩm',
            },
        },
    };
    return <>
        <Pie {...config} loading={isLoading} />
    </>
}