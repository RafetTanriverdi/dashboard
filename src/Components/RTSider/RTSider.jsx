import { Button, Menu } from "antd";
import { getRoutePath, routes } from "../../routes/routes";
import { NavLink } from "react-router-dom";
import { signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { ROUTES_ID } from "../../routes/routes-id";
import { Amplify } from "aws-amplify";
import awsExports from "../../authentication/aws-exports";

Amplify.configure(awsExports);
const RTSider = () => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    await signOut();
    localStorage.removeItem("accessToken");
    navigate(getRoutePath(ROUTES_ID.home));
  };

  const SignOut = () => {
    return <Button onClick={handleSignOut}>Sign Out</Button>;
  };

  const menu = routes
    .filter((e) => e.isPublic === false)
    .map((e) => {
      return {
        key: e.id,
        label: <NavLink to={e.path}>{e.title}</NavLink>,
      };
    });
  const signOutd = [
    {
      key: "signOut",
      label: <SignOut />,
    },
  ];

  const combinedMenu = [...menu, ...signOutd];
  return (
    <Menu
      theme="dark"
      mode="vertical"
      items={combinedMenu}
      style={{ flex: 1, minWidth: 0 }}
    />
  );
};

export default RTSider;
