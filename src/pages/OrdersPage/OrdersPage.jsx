import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import OrdersList from "./page-components/OrdersList/OrdersList";
import { Typography } from "antd";

const OrdersPageContainer = () => {
  return (
    <div style={{margin:'0 20px'}}>
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
