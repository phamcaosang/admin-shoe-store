import { SearchOutlined } from "@ant-design/icons"
import { Input, Space, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import type { ColumnType } from 'antd/es/table';
import { Dispatch, SetStateAction } from "react";

export interface DataIndexType {
  dataIndex: string,
  searchedColumn: string,
  setSearchedColumn: Dispatch<SetStateAction<string>>,
  searchText: string,
  setSearchText: Dispatch<SetStateAction<string>>,
  searchInput: string,
  setSearchInput: Dispatch<SetStateAction<string>>,
}
export const getColumnSearchProps = ({ dataIndex, searchedColumn, setSearchedColumn, searchText, setSearchText, searchInput, setSearchInput }: DataIndexType): ColumnType<any> => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
    <div style={{ padding: 8 }} onKeyDown={e => e.stopPropagation()}>
      <Input
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={e => {
          setSearchInput(e.target.value)
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }}
        onPressEnter={() => {
          confirm();
          setSearchText(selectedKeys[0]?.toString());
          setSearchedColumn(dataIndex);
        }}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => {
            confirm();
            setSearchText(selectedKeys[0]?.toString());
            setSearchedColumn(dataIndex);
          }}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => {
            setSearchInput('')
            setSelectedKeys([])
            if (clearFilters) {
              confirm();
              // clearFilters();
              setSearchText('');
              setSearchedColumn(dataIndex);
            }
          }}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            close();
          }}
        >
          Close
        </Button>
      </Space>
    </div >
  ),
  filterIcon: (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
  onFilter: (value: string | number | boolean, record: any) =>
    record[dataIndex]
      .toString()
      .toLowerCase()
      .includes((value as string).toLowerCase()),
  onFilterDropdownOpenChange: visible => {
    if (visible) {
      // setTimeout(() => searchInput.select(), 100);
    }
  },
  render: (text: string) =>
    searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ) : (
      text
    ),
});