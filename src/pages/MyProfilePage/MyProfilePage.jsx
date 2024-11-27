import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "@rt/layout/MainLayout/MainLayout";

import { Segmented } from "antd";
import "./MyProfilePage.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES_ID } from "@rt/routing/routes-id";
import { getRouteId, getRoutePath } from "@rt/routing/routes";
import AppClientRouter from "@rt/AppClientRouter";
import { useLocation } from "react-router-dom";
import { redirect } from "react-router-dom";

const MyProfilePageContainer = (props) => {
  const location=useLocation();
  const navigate = useNavigate();
  const { routeData } = props;
  const routes = routeData.children;
redirect(location.pathname + "/profile-details");

const checkedRoute = location.pathname.split("/")[2]
console.log(getRouteId(checkedRoute));
  return (
    <>
      <div>
        <Segmented
        defaultValue={getRouteId(checkedRoute)}
          options={[
            {
              label: "Profile",
              value: ROUTES_ID.myProfileDetailPage,
            },
            {
              label: "Password",
              value: ROUTES_ID.changePassword,
            },
          ]}
          onChange={(e) => navigate(getRoutePath(e))}
        />
      <AppClientRouter routes={routes} />
      </div>
    </>
  );
};

const MyProfilePage = (props) => {
  const { title } = props.routeData;
  return (
    <>
      <MainLayout
        title={title}
        sider={<RTSider />}
        content={<MyProfilePageContainer {...props} />}
      />
    </>
  );
};

export default MyProfilePage;
