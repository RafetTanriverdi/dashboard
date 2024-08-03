import { Button, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { signOut } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";
import { Amplify } from "aws-amplify";
import awsExports from "@rt/aws-exports";
import { getRoutePath, routes } from "../../routing/routes";
import { ROUTES_ID } from "../../routing/routes-id";
import { useAuthStore } from "@rt/data/Auth/UseAuthStore";



Amplify.configure(awsExports);


const RTSider = () => {
  const navigate = useNavigate();
  const {setIsAuthenticated} = useAuthStore();


  const handleSignOut = async () => {
    await signOut();
    setIsAuthenticated(null);
    navigate(getRoutePath(ROUTES_ID.login));

  };

  const SignOut = () => {
    return <Button onClick={handleSignOut}>Sign Out</Button>;
  };

  const menu = routes
    .filter((e) => e.path !== '/'&&e.isPublic === false)
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
