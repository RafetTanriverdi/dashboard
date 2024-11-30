import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import OrdersList from "./page-components/OrdersList/OrdersList";
import { Typography } from "antd";
import "./OrdersPage.scss";
import RTAuthContainer from "@rt/components/RTAuthContainer/RTAuthContainer";
import { Permissions } from "@rt/utils/permission-util";

const OrdersPageContainer = () => {
  return (
    <div className="orders-list-container">
      <Typography.Title level={3}>Orders</Typography.Title>
      <RTAuthContainer
        action={Permissions.orders.actions.read}
        subject={Permissions.orders.subject}
      >
        <OrdersList />
      </RTAuthContainer>
    </div>
  );
};

const OrdersPage = (props) => {
  const { title } = props.routeData;
  return (
    <MainLayout
      content={
        <>
          <OrdersPageContainer />
        </>
      }
      sider={<RTSider />}
      title={title}
    />
  );
};

export default OrdersPage;
