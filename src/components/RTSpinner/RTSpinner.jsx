import { Spin } from "antd";
import "./RTSpinner.scss";
import { publicRoutes } from "@rt/routing/routes";
import { useLocation } from "react-router-dom";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import RTSider from "../RTSider/RTSider";
import LoginLayout from "@rt/layout/LoginLayout/LoginLayout";

const RTSpinner = () => {
  const location = useLocation();
  if (publicRoutes.find((e) => e.path === location.pathname)) {
    return <LoginLayout content={<Spin  className="rt-spiner-layout" size="large" />} />;
  } else {
    return (
      <>
        <MainLayout
          sider={<RTSider />}
          content={<Spin className="rt-spiner-layout" size="large" />}
        />
      </>
    );
  }
};

export default RTSpinner;
