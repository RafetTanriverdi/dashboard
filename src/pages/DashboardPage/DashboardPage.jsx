/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import RTSider from "../../components/RTSider/RTSider";
import MainLayout from "../../layout/MainLayout/MainLayout";
import { useState } from "react";
import { ENDPOINTS } from "../../network/endpoints";
import { axiosInstance } from "../../network/httpRequester";
import { fetchAuthSession } from "aws-amplify/auth";

const DashboardPageContainer = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    async function currentSession() {
      try {
        const { accessToken, idToken } =
          (await fetchAuthSession()).tokens ?? {};
          console.log(accessToken, idToken);
      } catch (err) {
        console.log(err);
      }
    }
    currentSession();
  }, []);

  return <div>Dashboard Page</div>;
};

const DashboardPage = (props) => {
  const { title } = props.routeData;

  return (
    <MainLayout
      title={title}
      content={<DashboardPageContainer />}
      sider={<RTSider />}
    />
  );
};

export default DashboardPage;
