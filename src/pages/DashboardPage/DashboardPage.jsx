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
import { Desktop } from "@rt/components/RTCharts/RTPie/data/Desktop";
import { Mobile } from "@rt/components/RTCharts/RTPie/data/Mobile";
const fill = [
  {
    match: {
      id: "ruby",
    },
    id: "dots",
  },
  {
    match: {
      id: "c",
    },
    id: "dots",
  },
  {
    match: {
      id: "go",
    },
    id: "dots",
  },
  {
    match: {
      id: "python",
    },
    id: "dots",
  },
  {
    match: {
      id: "scala",
    },
    id: "lines",
  },
  {
    match: {
      id: "lisp",
    },
    id: "lines",
  },
  {
    match: {
      id: "elixir",
    },
    id: "lines",
  },
  {
    match: {
      id: "javascript",
    },
    id: "lines",
  },
];
const data = [
  {
    id: "sass",
    label: "sass",
    value: 283,
    color: "hsl(112, 70%, 50%)",
  },
  {
    id: "rust",
    label: "rust",
    value: 326,
    color: "hsl(305, 70%, 50%)",
  },
  {
    id: "make",
    label: "make",
    value: 232,
    color: "hsl(134, 70%, 50%)",
  },
  {
    id: "javascript",
    label: "javascript",
    value: 41,
    color: "hsl(179, 70%, 50%)",
  },
  {
    id: "java",
    label: "java",
    value: 234,
    color: "hsl(201, 70%, 50%)",
  },
];
const DashboardPageContainer = () => {
  const funnelChartRef = useRef(null);
  const pieChartRef = useRef(null);

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

  const income =
    (balance?.data?.available[0]?.amount + balance?.data?.pending[0]?.amount) /
    100;

  const tax = income * 0.09;

  let refundAmount = 0;
  for (let i = 0; i < 1; i++) {
    refundAmount += refund?.data[i]?.amount / 100;
  }

  useEffect(() => {
    if (pieChartRef.current) {
      pieChartRef.current.scrollLeft =
        (pieChartRef.current.scrollWidth - pieChartRef.current.clientWidth) / 2;
    }

    if (funnelChartRef.current) {
      funnelChartRef.current.scrollLeft =
        (funnelChartRef.current.scrollWidth -
          funnelChartRef.current.clientWidth) /
        2;
    }
  }, []);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={12} sm={12} md={6}>
          <Card>
            <Statistic
              className="dashboard-statistic"
              title="Income"
              value={income}
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
              title="Tax"
              value={tax}
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
          <Card className="line-container">
            <RTCharts.Line />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card className="pie-container" ref={pieChartRef}>
            <RTCharts.Pie data={data} fill={fill} desktop={Desktop} mobile={Mobile} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "16px" }}>
        <Col xs={24} md={8}>
          <Card className="funnel-container" ref={funnelChartRef}>
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
