import { Button, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Amplify } from "aws-amplify";
import {
  getRouteId,
  getRoutePath,
  routes,
} from "../../routing/routes";
import { ROUTES_ID } from "../../routing/routes-id";
import awsmobile from "@rt/aws-exports";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signOut } from "aws-amplify/auth";

Amplify.configure(awsmobile);

const RTSider = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = window.location.pathname;
  const fixedLocation = "/" + location.split("/")[1];

  const handleSignOut = async () => {
    await signOut()
      .then(() => {
        navigate(getRoutePath(ROUTES_ID.login));
        queryClient.clear();
      })
      .catch((err) => {
        console.error("Error signing out:", err);
      });
  };

  const mutation = useMutation({
    mutationKey: "signOut",
    mutationFn: handleSignOut,
  });
  const SignOut = () => {
    return (
      <Button onClick={mutation.mutate} loading={mutation.isPending}>
        Sign Out
      </Button>
    );
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
      selectedKeys={[getRouteId(fixedLocation)]}
      mode="inline"
      items={combinedMenu}
      style={{ flex: 1, minWidth: 0, height: "100%" }}
    />
  );
};

export default RTSider;
