import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import { Space } from "antd";
import { Typography } from "antd";
import "./CustomersPage.scss";
import CustomerList from "./page-components/CustomerList/CustomerList";
import { NewCustomerButton } from "./page-components/NewCustomer/NewCustomerButton";

const CustomersPageContainer = () => {
  return(

    <div className="customer-list-container">
    <div className="customer-list-header">
      <Typography.Title level={3}>Customers</Typography.Title>
      <Space> <NewCustomerButton /></Space>
    </div>
    <CustomerList className="customer-list" />
  </div>
  )
};

const CustomersPage = (params) => {
  const { title } = params.routeData;
  return (
    <MainLayout
      title={title}
      sider={<RTSider />}
      content={<CustomersPageContainer />}
    />
  );
};

export default CustomersPage;
