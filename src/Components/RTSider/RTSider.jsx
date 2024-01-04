import { Button, Menu } from "antd";
import React from "react";
import { routes } from "../../Routes/routes";
import { NavLink } from "react-router-dom";

const SignOut = () => {
  return (
    <Button onClick={() => alert("Sign Out Successfully !")}>Sign Out</Button>
  );
};

const menu = routes
  .filter((e) => e.isPublic === false)
  .map((e) => {
    return {
      key: e.id,
      label: <NavLink to={e.path}>{e.title}</NavLink>,
    };
  });
const signOut = [
  {
    key: "signOut",
    label: <SignOut />,
  },
];

const combinedMenu = [...menu, ...signOut];

const RTSider = () => {
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
