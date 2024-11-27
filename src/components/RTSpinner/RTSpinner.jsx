import { Spin } from "antd";
import "./RTSpinner.scss";
import { publicRoutes, routes } from "@rt/routing/routes";
import { useLocation } from "react-router-dom";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import RTSider from "../RTSider/RTSider";
import LoginLayout from "@rt/layout/LoginLayout/LoginLayout";

const RTSpinner = () => {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
const aimLocation ='/'+ splitLocation[splitLocation.length - 2];
const aimLocationHasChildren =routes.find((e)=>e.path===aimLocation)?.children?true:false;

  if (publicRoutes.find((e) => e.path === location.pathname)||aimLocationHasChildren) {
    return (
      <LoginLayout
        content={<Spin className="rt-spiner-layout" size="large" />}
      />
    );
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
