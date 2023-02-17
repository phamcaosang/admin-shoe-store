import { Switch, Table, Tag, Transfer } from 'antd';
import type { ColumnsType, TableRowSelection } from 'antd/es/table/interface';
import type { TransferItem, TransferProps } from 'antd/es/transfer';
import difference from 'lodash/difference';
import React, { useEffect, useState } from 'react';
import { CollectModelForm } from '../../../redux/apiSlicers/Collection';
import { ProductModelFull, useGetProductsQuery } from '../../../redux/apiSlicers/Product';


interface TableTransferProps extends TransferProps<TransferItem> {
    dataSource: ProductModelFull[];
    leftColumns: ColumnsType<ProductModelFull>;
    rightColumns: ColumnsType<ProductModelFull>;
}

// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }: TableTransferProps) => (
    <Transfer {...restProps} rowKey={record => record.sku} showSelectAll={false}>
        {({
            direction,
            filteredItems,
            onItemSelectAll,
            onItemSelect,
            selectedKeys: listSelectedKeys,
        }) => {
            const columns = direction === 'left' ? leftColumns : rightColumns;

            const rowSelection: TableRowSelection<TransferItem> = {
                // getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
                onSelectAll(selected, selectedRows) {
                    const treeSelectedKeys = selectedRows
                        .map(({ key }) => key);
                    const diffKeys = selected
                        ? difference(treeSelectedKeys, listSelectedKeys)
                        : difference(listSelectedKeys, treeSelectedKeys);
                    onItemSelectAll(diffKeys as string[], selected);
                },
                onSelect({ key }, selected) {
                    onItemSelect(key as string, selected);
                },
                selectedRowKeys: listSelectedKeys,
            };

            return (
                <Table
                    rowSelection={rowSelection}
                    columns={columns as ColumnsType<TransferItem>}
                    dataSource={filteredItems}
                    size="small"
                    pagination={{ pageSize: 5 }}
                    onRow={({ key }) => ({
                        onClick: () => {
                            onItemSelect(key as string, !listSelectedKeys.includes(key as string));
                        },
                    })}
                />
            );
        }}
    </Transfer>
);




const leftTableColumns: ColumnsType<ProductModelFull> = [
    {
        dataIndex: 'sku',
        title: 'SKU',
        width: "15%"
    },
    {
        dataIndex: 'name',
        title: 'Tên',
        render: (value: string) => {
            return <span style={{ fontSize: 12 }}>{value}</span>
        },
        width: "65%"
    },
    {
        dataIndex: 'model',
        title: 'Kiểu mẫu',
        render: (value: any) => {
            return <span style={{ fontSize: 14 }}>{value.name}</span>
        },
        width: "20%"
    },
];

const rightTableColumns: ColumnsType<ProductModelFull> = [
    {
        dataIndex: 'sku',
        title: 'SKU',
        width: "15%"
    },
    {
        dataIndex: 'name',
        title: 'Tên',
        render: (value: string) => {
            return <span style={{ fontSize: 12 }}>{value}</span>
        },
        width: "65%"
    },
    {
        dataIndex: 'model',
        title: 'Kiểu mẫu',
        render: (value: any) => {
            return <span style={{ fontSize: 14 }}>{value.name}</span>
        },
        width: "20%"
    },
];


interface IProductSelection {
    name: string,
    setState: React.Dispatch<React.SetStateAction<CollectModelForm>>,
    initKeys: {
        sku: string,
        name: string
    }[]
}
export const ProductSelection: React.FC<IProductSelection> = ({ setState, name, initKeys }) => {
    const { data } = useGetProductsQuery();
    const [targetKeys, setTargetKeys] = useState<string[]>([]);

    const onChange = (nextTargetKeys: string[]) => {
        setTargetKeys(nextTargetKeys);
        setState(prev => {
            return {
                ...prev,
                [name]: nextTargetKeys
            }
        })
    };

    useEffect(() => {
        const initDataKeys = initKeys.map(i => i.sku)
        onChange(initDataKeys)
    }, [initKeys.length, initKeys])

    return (
        <TableTransfer

            dataSource={data ? data : []}
            targetKeys={targetKeys}
            showSearch={true}
            onChange={onChange}
            filterOption={(inputValue, item) =>
                item.name!.indexOf(inputValue) !== -1 || item.sku!.indexOf(inputValue) !== -1 || item.model.name.indexOf(inputValue) !== - 1
            }
            leftColumns={leftTableColumns}
            rightColumns={rightTableColumns}
        />
    );
};
