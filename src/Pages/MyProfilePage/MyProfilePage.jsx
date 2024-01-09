import RTSider from "../../Components/RTSider/RTSider";
import MainLayout from "../../Layout/MainLayout/MainLayout";

const MyProfilePageContainer = () => {
  return <div>MyProfilePage</div>;
};
const MyProfilePage = () => {
  return (
    <MainLayout content={<MyProfilePageContainer />} sider={<RTSider />} />
  );
};

export default MyProfilePage;
