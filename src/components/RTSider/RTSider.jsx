import { Button, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { getRouteId, getRoutePath, routes } from "../../routing/routes";
import { ROUTES_ID } from "../../routing/routes-id";
import awsmobile from "@rt/aws-exports";
import { useQueryClient } from "@tanstack/react-query";
import { signOut } from "aws-amplify/auth";

Amplify.configure(awsmobile);

const RTSider = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    try {
      await signOut(); // Sign out from AWS Amplify
      localStorage.clear(); // Clear local storage
      sessionStorage.clear()
      queryClient.clear(); // Clear cache asynchronously
      navigate(getRoutePath(ROUTES_ID.login)); // Navigate to login page
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  const SignOut = () => {
    return <Button onClick={handleSignOut}>Sign Out</Button>;
  };

  const menu = routes
    .filter((e) => e.path !== "/" && e.isPublic === false)
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
      selectedKeys={[getRouteId(window.location.pathname)]}
      mode="inline"
      items={combinedMenu}
      style={{ flex: 1, minWidth: 0 }}
    />
  );
};

export default RTSider;
