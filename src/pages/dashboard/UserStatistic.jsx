import { Row, Col, Statistic } from 'antd';
import CountUp from 'react-countup'
import { ArrowUpOutlined } from '@ant-design/icons';

const formatter = (value) => <CountUp end={value} separator="," />;

export const UserStatistic = () => {
    return <>
        <Row gutter={16} style={{ padding: 15 }}>
            <Col span={12}>
                <Statistic loading={true} title={<span style={{ fontSize: 20 }}>Tổng số khách hàng</span>} value={200} formatter={formatter} />
            </Col>
            <Col span={12}>
                <Statistic
                    loading={true}
                    title={<span style={{ fontSize: 20 }}>Số người dùng mới trong tháng</span>}
                    value={30}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                />
            </Col>
        </Row>
    </>
}