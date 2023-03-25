import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Button, Input, InputNumber, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ColumnType } from 'antd/es/table';
import PopupViewFormV1 from '../../../components/modals/PopupViewModalV1';
import { Editbtn } from '../../../components/buttons/Editbtn';
import { Viewbtn } from '../../../components/buttons/Viewbtn';
import { Createbtn } from '../../../components/buttons/Createbtn';
import { Deletebtn } from '../../../components/buttons/Deletebtn';
import { PopupSelectionDeleteItem } from '../../../components/modals/PopupSelectionModals';
import { getColumnSearchProps } from '../../../components/formInputs/SearchInputColumn';
import { TypeModelFull, useDeleteTypeMutation, useGetTypesQuery, useUpdateSelectedMutation } from '../../../redux/apiSlicers/ProductType';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import update from 'immutability-helper';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemName = "loại sản phẩm"
const RouteName = 'type'

interface DraggableBodyRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
}
const DraggableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}: DraggableBodyRowProps) => {
  const ref = useRef<HTMLTableRowElement>(null);
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: (item: { index: number }) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    type,
    item: { index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));

  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ''}`}
      style={{ cursor: 'move', ...style }}
      {...restProps}
    />
  );
};

const type = 'DraggableBodyRow';



const TableProductTypeProps = (showModalView: (record: TypeModelFull) => void, showModalDelete: (record: TypeModelFull) => void): ColumnsType<TypeModelFull> => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const furtherSearchProp = (dataIndex: string): ColumnType<TypeModelFull> => {
    return getColumnSearchProps({ dataIndex, searchedColumn, setSearchedColumn, searchText, setSearchText, searchInput, setSearchInput })
  }

  return [
    {
      title: 'Tên phân loại',
      dataIndex: 'name',
      width: '20%',
      ...furtherSearchProp('name')
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      width: '15%',
      render: (image: string | undefined) => {
        return image ? <img src={image} style={{
          width: 50, height: 50, objectFit: 'cover'
        }} alt="alt" /> : <></>
      }
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      width: '35%',
      responsive: ['md'],
      ...furtherSearchProp('description'),
      render: (dsc: string) => {
        return <Tooltip title={dsc}>
          {dsc.slice(0, 70)}
        </Tooltip>
      }
    },
    // {
    //   title: 'Thứ tự',
    //   dataIndex: 'selected',
    //   width: '10%',
    //   render: (selected: number | null) => {
    //     return <>
    //       <InputNumber value={selected} min={1} max={3} step={1} />
    //     </>
    //   }
    // },
    {
      title: 'Hành động',
      key: 'operation',
      fixed: 'right',
      width: '20%',
      render: (record: TypeModelFull) =>
        <>
          {/* <Viewbtn text="View" action={() => showModalView(record)} /> */}
          <Editbtn direction={`/${RouteName}/edit/${record.id}`} text="Sửa" />
          <Deletebtn text='Xóa' action={() => showModalDelete(record)} />
        </>,
    },
  ]

}


const Type: React.FC = () => {
  const [updateSelected, { isLoading: loadingSelected }] = useUpdateSelectedMutation()
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [dataView, setDataView] = useState<TypeModelFull | null>(null);
  const { data, isLoading, isSuccess } = useGetTypesQuery()
  const [dataSource, setDataSource] = useState<TypeModelFull[]>([])
  const [deleteType] = useDeleteTypeMutation()

  const showModalView = (record: TypeModelFull) => {
    setDataView(record)
    setOpenView(true);
  };
  const hideModalView = () => {
    setDataView(null)
    setOpenView(false);
  };

  const showModalDelete = (record: TypeModelFull) => {
    setDataView(record)
    setOpenDelete(true);
  };
  const hideModalDelete = () => {
    setDataView(null)
    setOpenDelete(false);
  };

  const components = {
    body: {
      row: DraggableBodyRow,
    },
  };
  const moveRow = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragRow = dataSource[dragIndex];
      setDataSource(
        update(dataSource, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow],
          ],
        }),
      );
    },
    [dataSource],
  );

  useEffect(() => {
    isSuccess && setDataSource(data)
  }, [isSuccess, isLoading])


  return <div>
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Button type='primary' style={{ marginRight: 20 }} loading={loadingSelected} onClick={() => {
        updateSelected(dataSource.slice(0, 3).map(({ id }) => id))
      }}>Lưu thứ tự</Button>
      <Createbtn direction={`/${RouteName}/create`} text={`Thêm phân loại sản phẩm`} />
    </div>
    <div style={{ margin: "10px", fontSize: 18 }}>
      Lưu ý: 3 sản phẩm đầu sẽ được xuất hiện trên trang chủ theo thứ tự. Có thể kéo thả và nhấn "lưu thứ tự" để thay đổi.
    </div>
    <DndProvider backend={HTML5Backend}>
      <Table
        pagination={false}
        columns={TableProductTypeProps(showModalView, showModalDelete)}
        dataSource={dataSource}
        loading={isLoading}
        components={components}
        onRow={(_, index) => {
          const attr = {
            index,
            moveRow,
          };
          return attr as React.HTMLAttributes<any>;
        }}
      />
    </DndProvider>
    {
      openView && <PopupViewFormV1
        title={`${ItemName} information`}
        open={openView}
        onOk={hideModalView}
        onCancel={hideModalView}
        data={dataView}
      />
    }
    {
      openDelete && <PopupSelectionDeleteItem
        deleteItem={deleteType}
        itemType={ItemName}
        open={openDelete}
        onCancel={hideModalDelete}
        data={dataView}
      />
    }
  </div>
}

export default Type;

