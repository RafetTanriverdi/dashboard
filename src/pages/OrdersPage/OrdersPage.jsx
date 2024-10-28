import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import OrdersList from "./page-components/OrdersList/OrdersList";
import { Typography } from "antd";
import './OrdersPage.scss';

const OrdersPageContainer = () => {
  return (
    <div className="orders-list-container">
    <Typography.Title level={3}>Orders</Typography.Title>
      <OrdersList />
    </div>
  );
};

const OrdersPage = (props) => {
  const { title } = props.routeData;
  return (
    <MainLayout
      content={<OrdersPageContainer />}
      sider={<RTSider />}
      title={title}
    />
  );
};

export default OrdersPage;
