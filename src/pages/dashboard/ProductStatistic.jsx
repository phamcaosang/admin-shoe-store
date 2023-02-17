import { Avatar, Card, Row, Col, Statistic } from 'antd';
import CountUp from 'react-countup'

const formatter = (value) => <CountUp end={value} separator="," />;

export const ProductStatistic = () => {
    return <>
        <Row gutter={16} style={{ padding: 15 }}>
            <Col span={6}>
                <Statistic title={<span style={{ fontSize: 20 }}>Số sản phẩm</span>} value={150} formatter={formatter} />
            </Col>
            <Col span={6}>
                <Statistic title={<span style={{ fontSize: 20 }}>Giá cao nhất</span>} value={2000000} precision={2} formatter={formatter} />
            </Col>
            <Col span={6}>
                <Statistic title={<span style={{ fontSize: 20 }}>Giá cao nhất</span>} value={150000} precision={2} formatter={formatter} />
            </Col>
            <Col span={6}>
                <Statistic title={<span style={{ fontSize: 20 }}>Giá trung bình</span>} value={350000} precision={2} formatter={formatter} />
            </Col>
        </Row>
    </>
}