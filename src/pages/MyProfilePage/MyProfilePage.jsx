import RTSider from "@ca/components/RTSider/RTSider";
import MainLayout from "@ca/layout/MainLayout/MainLayout";

const MyProfilePageContainer = () => {
  return <div>MyProfilePage</div>;
};

const MyProfilePage = () => {
  return (
    <>
      <MainLayout sider={<RTSider />} content={<MyProfilePageContainer />} />
    </>
  );
};

export default MyProfilePage;
