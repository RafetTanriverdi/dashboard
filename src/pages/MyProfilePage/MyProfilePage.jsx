import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "@rt/layout/MainLayout/MainLayout";

import { Segmented } from "antd";
import "./MyProfilePage.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES_ID } from "@rt/routing/routes-id";
import { getRouteId, getRoutePath } from "@rt/routing/routes";
import AppClientRouter from "@rt/AppClientRouter";
import { useLocation } from "react-router-dom";
import { useMatch } from "react-router-dom";
import { Navigate } from "react-router-dom";
import RTChildrenSpinner from "@rt/components/RTChildrenSpinner/RTChildrenSpinner";

const MyProfilePage = (props) => {
  const { routeData } = props;
  const { title } = props.routeData;
  const routes = routeData.children;

  const location = useLocation();
  const navigate = useNavigate();

  const main = getRoutePath(ROUTES_ID.myProfilePage);
  const checkedRoute = location.pathname.split("/")[2];
  const matchMain = useMatch(main);
  if (matchMain) {
    return <Navigate to={getRoutePath(ROUTES_ID.myProfileDetailPage)} />;
  }

  const renderContent = () => {
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
                label: "Change Password",
                value: ROUTES_ID.changePassword,
              },
            ]}
            onChange={(e) => navigate(getRoutePath(e))}
          />

          <AppClientRouter routes={routes} loading={<RTChildrenSpinner />} />
        </div>
      </>
    );
  };

  return (
    <>
      <MainLayout title={title} sider={<RTSider />} content={renderContent()} />
    </>
  );
};

export default MyProfilePage;
