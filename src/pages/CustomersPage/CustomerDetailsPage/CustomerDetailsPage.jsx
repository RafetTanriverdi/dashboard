import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import CustomerLayout from "@rt/layout/MainLayout/CustomerLayout/CustomerLayout";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useQuery } from "@tanstack/react-query";
import { Card, Row, Col } from "antd";
import { useParams } from "react-router-dom";
import { Space } from "antd";
import { Typography } from "antd";
import "./CustomerDetailsPage.scss";
import { Statistic } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import CountUp from "react-countup";
import { RTCharts } from "@rt/components/RTCharts";

import UserDetails from "./page-components/UserDetails/UserDetails";
import ChargeList from "./page-components/ChargeList/ChargeList";

const CustomerDetailsPageContainer = ({ data, error, isLoading }) => {
  if (isLoading) return <RTSkeleton />;
  if (error) return <div>{error.message}</div>;
  return (
    <div style={{ padding: "10px" }}>
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: "5px",
        }}
      >
        <Typography.Title level={4}>Customer Overview</Typography.Title>
      </Space>

      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        align="top"
        style={{
          marginBottom: "10px",
        }}
      >
        <UserDetails data={data} />
      </Row>

      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <ChargeList data={data} />
      </Row>

      <Row gutter={{ xs: 8, sm: 12, md: 24, lg: 32 }}>
        <Col xs={24} lg={12}>
          <Card style={{ height: "50%" }}>
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

          <Card style={{ height: "50%" }}>
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
        <Col
          xs={24}
          lg={12}
          style={{ width: "100%", height: "450px", display: "flex" }}
        >
          <Card
            className="pie-container"
            style={{ width: "100%", height: "100%" }}
          >
            <RTCharts.Pie />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const CustomerDetailsPage = () => {
  const params = useParams();
  const { customerId } = params;

  const { data, error, isLoading } = useQuery({
    queryKey: ["customers", customerId],
    queryFn: () =>
      axiosInstance.get(
        ENDPOINTS.CUSTOMERS.GET.replace(":customerId", customerId)
      ),
  });

  return (
    <CustomerLayout
      title={data ? data?.data?.name : "Customer Name"}
      content={
        <CustomerDetailsPageContainer
          data={data?.data}
          error={error}
          isLoading={isLoading}
        />
      }
    />
  );
};

export default CustomerDetailsPage;
