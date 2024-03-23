import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "@rt/layout/MainLayout/MainLayout";

const MyProfilePageContainer = () => {
  return <div>MyProfilePage</div>;
};

const MyProfilePage = (props) => {
  const { title } = props.routeData;
  return (
    <>
      <MainLayout title={title}  sider={<RTSider />} content={<MyProfilePageContainer />} />
    </>
  );
};

export default MyProfilePage;
