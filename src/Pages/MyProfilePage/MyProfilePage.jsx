import RTSider from "../../components/RTSider/RTSider";
import MainLayout from "../../layout/MainLayout/MainLayout";

const MyProfilePageContainer = () => {
  return <div>MyProfilePage</div>;
};
const MyProfilePage = () => {
  return (
    <MainLayout content={<MyProfilePageContainer />} sider={<RTSider />} />
  );
};

export default MyProfilePage;
