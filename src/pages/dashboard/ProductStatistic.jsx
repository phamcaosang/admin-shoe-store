import { Avatar, Card, Row, Col, Statistic } from 'antd';
import CountUp from 'react-countup'
import { useGetProductsQuery } from '../../redux/apiSlicers/Product';

const formatter = (value) => <CountUp end={value} separator="," />;

export const ProductStatistic = () => {
    const { data, isLoading } = useGetProductsQuery()
    return <>
        <Row gutter={16} style={{ padding: 15 }}>
            <Col span={6}>
                <Statistic loading={isLoading} title={<span style={{ fontSize: 20 }}>Số sản phẩm</span>} value={data?.length} formatter={formatter} />
            </Col>
            <Col span={6}>
                <Statistic loading={isLoading} title={<span style={{ fontSize: 20 }}>Giá thấp nhất</span>} value={data?.map(i => i.price).sort()[0]} precision={2} formatter={formatter} />
            </Col>
            <Col span={6}>
                <Statistic loading={isLoading} title={<span style={{ fontSize: 20 }}>Giá cao nhất</span>} value={data?.map(i => i.price).sort((a, b) => b - a)[0]} precision={2} formatter={formatter} />
            </Col>
            <Col span={6}>
                <Statistic loading={isLoading} title={<span style={{ fontSize: 20 }}>Giá trung bình</span>} value={data?.map(i => i.price).reduce((a, b) => a + b, 0) / data?.length} precision={2} formatter={formatter} />
            </Col>
        </Row>
    </>
}