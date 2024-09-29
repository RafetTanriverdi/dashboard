import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "@rt/layout/MainLayout/MainLayout";

const OrdersPageContainer = () => {
  return <div>OrdersPageContainer</div>;
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
