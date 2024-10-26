import { Card, Col, Row, Statistic } from "antd";
import RTSider from "../../components/RTSider/RTSider";
import MainLayout from "../../layout/MainLayout/MainLayout";
import "./DashboardPage.scss";
import { RTCharts } from "@rt/components/RTCharts";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import CountUp from "react-countup";

const DashboardPageContainer = () => {
  return (
    <>
      <Row gutter={[16, 16]} style={{ margin: "20px 10px" }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Income"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              suffix={<ArrowUpOutlined />}
              prefix="$"
              formatter={(value) => (
                <CountUp end={value} decimals={2} prefix="$" />
              )}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tax"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
              formatter={(value) => (
                <CountUp end={value} decimals={2} suffix="%" />
              )}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Cost"
              value={11.28}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="%"
              formatter={(value) => (
                <CountUp end={value} decimals={2} suffix="%" />
              )}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              style={{ textAlign: "center" }}
              title="Total"
              value={9.3}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="%"
              formatter={(value) => <CountUp end={value} decimals={2} />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col xs={24} md={16}>
          <Card className="line-container">
            <RTCharts.Line />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="pie-container">
            <RTCharts.Pie />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col xs={24} md={8}>
          <Card className="bar-container">
            <RTCharts.Funnel />
          </Card>
        </Col>
        <Col xs={24} md={16}>
          <Card className="heat-map-container">
            <RTCharts.HeatMap />
          </Card>
        </Col>
      </Row>
    </>
  );
};

const DashboardPage = (props) => {
  const { title } = props.routeData;

  return (
    <MainLayout
      title={title}
      content={<DashboardPageContainer />}
      sider={<RTSider />}
    />
  );
};

export default DashboardPage;
