import RTSkeleton from "@rt/components/RTSkeleton/RTSkeleton";
import CustomerLayout from "@rt/layout/MainLayout/CustomerLayout/CustomerLayout";
import { ENDPOINTS } from "@rt/network/endpoints";
import axiosInstance from "@rt/network/httpRequester";
import { useQuery } from "@tanstack/react-query";
import { Row } from "antd";
import { useParams } from "react-router-dom";
import { Space } from "antd";
import { Typography } from "antd";
import "./CustomerDetailsPage.scss";

import UserDetails from "./page-components/UserDetails/UserDetails";
import ChargeList from "./page-components/ChargeList/ChargeList";
import UserDashboard from "./page-components/UserDashboard/UserDashboard";
import RTAlert from "@rt/components/RTFeedback/Alert/Alert";
import RTAuthContainer from "@rt/components/RTAuthContainer/RTAuthContainer";
import { Permissions } from "@rt/utils/permission-util";

const CustomerDetailsPageContainer = ({ data, error, isLoading }) => {
  if (isLoading) return <RTSkeleton />;
  if (error)
    return <RTAlert type="error" message={error.response.data.message} />;
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

      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{
          marginBottom: "10px",
        }}
      >
        <ChargeList data={data} />
      </Row>

      <Row gutter={{ xs: 8, sm: 12, md: 24, lg: 32 }}>
        <UserDashboard
          customerId={data.customerId}
          stripeId={data.customerStripeId}
        />
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
      axiosInstance
        .get(ENDPOINTS.CUSTOMERS.GET.replace(":customerId", customerId))
        .then((res) => res.data),
  });

  return (
    <CustomerLayout
      title={data ? data?.name : "Customer Name"}
      content={
        <RTAuthContainer
          action={Permissions.customers.actions.details}
          subject={Permissions.customers.subject}
        >
          <CustomerDetailsPageContainer
            data={data}
            error={error}
            isLoading={isLoading}
          />
        </RTAuthContainer>
      }
    />
  );
};

export default CustomerDetailsPage;
