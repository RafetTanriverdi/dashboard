import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import CustomersList from "./page-components/CustomersList/CustomersList";
import AppClientRouter from "@rt/AppClientRouter";
import { useLocation } from "react-router-dom";
import { isRoutePathChild } from "@rt/routing/routes";
import { Typography } from "antd";
import "./CustomersPage.scss";

const CustomersPageContainer = () => {
  return (
    <div className="customer-container">
      <Typography.Title level={3}>Customers</Typography.Title>
      <CustomersList className="customer-list" />
    </div>
  );
};

const CustomersPage = (props) => {
  const location = useLocation();
  const { title } = props.routeData;
  const { children: routes } = props.routeData;
  const isChild = isRoutePathChild(location.pathname);

  if (isChild) {
    return <AppClientRouter routes={routes} />;
  }
  return (
    <>
      <MainLayout
        content={<CustomersPageContainer {...props} />}
        sider={<RTSider />}
        title={title}
      />
    </>
  );
};

export default CustomersPage;
