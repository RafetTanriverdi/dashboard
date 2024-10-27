import { Card, Col, Row, Statistic } from "antd";
import RTSider from "../../components/RTSider/RTSider";
import MainLayout from "../../layout/MainLayout/MainLayout";
import "./DashboardPage.scss";
import { RTCharts } from "@rt/components/RTCharts";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import CountUp from "react-countup";
import { useRef } from "react";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@rt/network/httpRequester";
import { ENDPOINTS } from "@rt/network/endpoints";

const DashboardPageContainer = () => {
  const scrollContainerRef = useRef(null);

  const { data: refund } = useQuery({
    queryKey: ["refund"],
    queryFn: () => {
     return axiosInstance.get(ENDPOINTS.STRIPE.REFUNDS).then((res) => res.data.data);
    },
  });
  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => {
      const reponse = axiosInstance.get(ENDPOINTS.STRIPE.TRANSACTIONS);
      return reponse;
    },
  });

  const { data: balance } = useQuery({
    queryKey: ["balance"],
    queryFn: () => {
      const reponse = axiosInstance.get(ENDPOINTS.STRIPE.BALANCE);
      return reponse;
    },
  });

  const income =
    (balance?.data?.available[0].amount + balance?.data?.pending[0].amount) /
    100;

  const tax = income * 0.09;

  let refundAmount = 0;
  for (let i = 0; i < 1; i++) {
    refundAmount += refund[i].amount / 100;
  }
  console.log(transactions);
  console.log(refund);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollLeft =
        (container.scrollWidth - container.clientWidth) / 2;
    }
  }, []);
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Statistic
              title="Income"
              value={income}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              formatter={(value) => (
                <CountUp end={value} decimals={2} prefix="$" />
              )}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Statistic
              title="Tax"
              value={tax}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              formatter={(value) => (
                <CountUp end={value} decimals={2} prefix="$" />
              )}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Statistic
              title="Refund"
              value={refundAmount}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              formatter={(value) => (
                <CountUp end={value} decimals={2} prefix="$" />
              )}
            />
          </Card>
        </Col>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Statistic
              title="Available Balance"
              value={balance?.data?.available[0].amount / 100}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              formatter={(value) => (
                <CountUp end={value} decimals={2} prefix="$" />
              )}
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
          <Card className="pie-container" ref={scrollContainerRef}>
            <RTCharts.Pie />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col xs={24} md={8}>
          <Card className="funnel-container" ref={scrollContainerRef}>
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
