import { Row, Col } from "antd"
import { BarViewProduct } from "./BarViewProduct";
import { PieProduct } from "./PieProduct";
import { ProductStatistic } from "./ProductStatistic";
import { TopWishProduct } from "./TopWishProduct";
import { OrderStatistic } from "./OrderStatistic";

export const Dashboard = () => {

  return <div style={{ width: "100%", height: "100vh", overflow: "scroll" }}>
    <Row gutter={30}>
      <Col className="gutter-row" span={24} lg={{ span: 10 }} >
        <div style={{ marginTop: 50, backgroundColor: "white" }}>
          <div style={{
            fontWeight: 300,
            fontSize: 32,
            textAlign: "center"
          }}>
            Số sản phẫm mỗi phân loại
          </div>
          <PieProduct />
        </div>
      </Col>
      <Col className="gutter-row" span={24} lg={{ span: 14 }} >
        <div style={{ marginTop: 50, backgroundColor: "white" }}>
          <div style={{
            fontWeight: 300,
            fontSize: 32,
            marginLeft: 50,
          }}>
            Top 8 sản phẩm có lượt view cao nhất
          </div>
          <BarViewProduct />
        </div>
      </Col>

      <Col className="gutter-row" span={24} lg={{ span: 10 }} >
        <div style={{ marginTop: 50, backgroundColor: "white" }}>
          <div style={{
            fontWeight: 300,
            fontSize: 32,
            textAlign: "center",
            paddingTop: 15
          }}>
            Thông số sản phẩm
          </div>
          <ProductStatistic />
        </div>
        <div style={{ marginTop: 50, backgroundColor: "white" }}>
          <div style={{
            fontWeight: 300,
            fontSize: 32,
            textAlign: "center",
            paddingTop: 15
          }}>
            Thông số đơn hàng
          </div>
          <OrderStatistic />
        </div>
      </Col>
      <Col className="gutter-row" span={24} lg={{ span: 14 }} >
        <div style={{ marginTop: 50, backgroundColor: "white" }}>
          <div style={{
            fontWeight: 300,
            fontSize: 32,
            marginLeft: 50,
          }}>
            Top sản phẩm được yêu thích
          </div>
          <TopWishProduct />
        </div>
      </Col>

    </Row>
  </div >;
};
