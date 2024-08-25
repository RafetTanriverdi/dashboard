import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "@rt/layout/MainLayout/MainLayout";

import { fetchUserAttributes } from "aws-amplify/auth";
import { useEffect } from "react";

const MyProfilePageContainer = () => {


  useEffect(() => {
    async function handleFetchUserAttributes() {
      try {
      await fetchUserAttributes();
      } catch (error) {
        console.error(error);
      }
    }
    handleFetchUserAttributes()
  }, [])
  
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
