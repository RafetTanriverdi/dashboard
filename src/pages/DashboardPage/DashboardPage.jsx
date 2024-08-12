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
      <Row gutter={16} style={{ margin: "20px 10px 0px 10px" }}>
        <Col span={6}>
          <Card >
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
        <Col span={6}>
          <Card >
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
        <Col span={6}>
          <Card >
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
        <Col span={6}>
          <Card >
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
      <div style={{ width: "100%", height: "50%", display: "flex" }}>
        <Card
          className="line-container"
          style={{ width: "70%", height: "100%" }}
        >
          <RTCharts.Line />
        </Card>
        <Card
          className="pie-container"
          style={{ width: "27%", height: "100%" }}
        >
          <RTCharts.Pie />
        </Card>
      </div>
      <div style={{ width: "100%", height: "30%", display: "flex", marginTop:'10px' }}>
        <Card
          className="bar-container"
          style={{ width: "25%", height: "100%" }}
        >
          <RTCharts.Funnel />
        </Card>
        <Card
          className="heat-map-container"
          style={{ width: "70%", height: "100%" }}
        >
          <RTCharts.HeatMap />
        </Card>
      </div>
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
