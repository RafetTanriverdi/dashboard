import { Card, Col, Row, Statistic } from "antd";
import RTSider from "../../components/RTSider/RTSider";
import MainLayout from "../../layout/MainLayout/MainLayout";
import "./DashboardPage.scss";
import { RTCharts } from "@rt/components/RTCharts";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import CountUp from "react-countup";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@rt/network/httpRequester";
import { ENDPOINTS } from "@rt/network/endpoints";

import PieChart from "./page-components/PieChart/PieChart";
import LineChart from "./page-components/LineChart/LineChart";
import FunnelChart from "./page-components/FunnelChart/FunnelChart";

const DashboardPageContainer = () => {
  const { data: refund } = useQuery({
    queryKey: ["refund"],
    queryFn: () => {
      return axiosInstance
        .get(ENDPOINTS.STRIPE.REFUNDS)
        .then((res) => res.data);
    },
  });

  const { data: balance } = useQuery({
    queryKey: ["balance"],
    queryFn: () => {
      const reponse = axiosInstance.get(ENDPOINTS.STRIPE.BALANCE);
      return reponse;
    },
  });

  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => {
      return axiosInstance
        .get(ENDPOINTS.STRIPE.TRANSACTIONS)
        .then((res) => res.data);
    },
  });

  let fee = 0;
  for (let i = 0; i < transactions?.length; i++) {
    fee += transactions[i]?.fee / 100;
  }

  const income =
    (balance?.data?.available[0]?.amount + balance?.data?.pending[0]?.amount) /
    100;

  let refundAmount = 0;
  for (let i = 0; i < 1; i++) {
    refundAmount += refund?.data[i]?.amount / 100;
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Statistic
              className="dashboard-statistic"
              title="Income"
              value={income + fee}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              formatter={(value) => (
                <CountUp end={value} decimals={2} suffix="$" />
              )}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Statistic
              className="dashboard-statistic"
              title="Fee"
              value={fee}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              formatter={(value) => (
                <CountUp end={value} decimals={2} suffix="$" />
              )}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Statistic
              className="dashboard-statistic"
              title="Refund"
              value={refundAmount}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              formatter={(value) => (
                <CountUp end={value} decimals={2} suffix="$" />
              )}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Statistic
              className="dashboard-statistic"
              title="Available Balance"
              value={balance?.data?.available[0]?.amount / 100}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              formatter={(value) => (
                <CountUp end={value} decimals={2} suffix="$" />
              )}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col xs={24} md={16}>
          <LineChart />
        </Col>
        <Col xs={24} md={8}>
          <PieChart />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col xs={24} md={8}>
          <FunnelChart />
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
