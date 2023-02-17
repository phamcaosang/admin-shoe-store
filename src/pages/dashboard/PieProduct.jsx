import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';
import React, { useState, useEffect } from 'react';


export const PieProduct = () => {
    const data = [
        {
            type: 'AAAAAAA',
            value: 27,
        },
        {
            type: 'BBBBBBB',
            value: 25,
        },
        {
            type: 'CCCCCc',
            value: 18,
        },
        {
            type: 'DDDDDDDD',
            value: 15,
        },
        {
            type: 'EEEEEE',
            value: 10,
        },
        {
            type: 'FFFFFF',
            value: 5,
        },
    ];
    const config = {
        legend: false,
        appendPadding: 40,
        data,
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
        <Pie {...config} />
    </>
}