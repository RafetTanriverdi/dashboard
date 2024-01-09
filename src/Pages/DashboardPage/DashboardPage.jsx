import MainLayout from "../../Layout/MainLayout/MainLayout";
import RTSider from "../../Components/RTSider/RTSider";

const DashboardPageContainer = () => {
  return(
    <div>Dashboard Page</div>
  )
};

const DashboardPage = () => {
  return (
    <MainLayout content={<DashboardPageContainer />} sider={<RTSider />} />
  );
};

export default DashboardPage;
