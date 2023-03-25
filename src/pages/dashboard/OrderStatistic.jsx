import { Row, Col, Statistic } from 'antd';
import CountUp from 'react-countup'
import { ArrowUpOutlined } from '@ant-design/icons';
import { useGetOrdersQuery } from '../../redux/apiSlicers/Order';

const formatter = (value) => <CountUp end={value} separator="," />;

export const OrderStatistic = () => {
    const { data, isLoading } = useGetOrdersQuery(undefined, {
        selectFromResult: ({ data, isLoading }) => {
            return {
                isLoading,
                data: data?.map(i => i.stage)
            }
        }
    })
    return <>
        <Row gutter={16} style={{ padding: 15 }}>
            <Col span={6}>
                <Statistic loading={isLoading} title={<span style={{ fontSize: 20 }}>Đang xử lý</span>} value={data?.filter(i => i === 1).length} formatter={formatter} />
            </Col>
            <Col span={6}>
                <Statistic
                    loading={isLoading}
                    title={<span style={{ fontSize: 20 }}>Đơn đã nhận</span>}
                    value={data?.filter(i => i === 2).length}
                    valueStyle={{ color: '#3f8600' }}
                // prefix={<ArrowUpOutlined />}
                />
            </Col>
            <Col span={6}>
                <Statistic
                    loading={isLoading}
                    title={<span style={{ fontSize: 20 }}>Đơn đã gửi</span>}
                    value={data?.filter(i => i === 3).length}
                    valueStyle={{ color: '#3f8600' }}
                // prefix={<ArrowUpOutlined />}
                />
            </Col>
            <Col span={6}>
                <Statistic
                    loading={isLoading}
                    title={<span style={{ fontSize: 20 }}>Đơn đã hủy</span>}
                    value={data?.filter(i => i === -1).length}
                    valueStyle={{ color: '#3f8600' }}
                // prefix={<ArrowUpOutlined />}
                />
            </Col>
        </Row>
    </>
}