import RTSider from '../../components/RTSider/RTSider'
import MainLayout from '../../layout/MainLayout/MainLayout'
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
