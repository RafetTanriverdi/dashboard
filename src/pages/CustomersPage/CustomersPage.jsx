import RTSider from "@ca/components/RTSider/RTSider";
import MainLayout from "@ca/layout/MainLayout/MainLayout";

const CustomersPageContainer = () => {
  return <div>CustomersPage</div>;
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
