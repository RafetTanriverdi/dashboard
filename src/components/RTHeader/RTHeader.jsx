/* eslint-disable no-unused-vars */
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { getToken } from "@rt/authentication/auth-utils";
import { useThemeChangeStore } from "@rt/data/Theme/Theme";
import { Button, Space } from "antd";
import { Typography } from "antd";
import { jwtDecode } from "jwt-decode";
import "./RTHeader.scss";

import { useCookies } from "react-cookie";
import { Menu } from "lucide-react";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";
import { getRoutePath } from "@rt/routing/routes";
import { ROUTES_ID } from "@rt/routing/routes-id";
import { useNavigate } from "react-router-dom";

const RTHeader = ({ open, setOpen, isMobile }) => {
  const { theme, setTheme } = useThemeChangeStore();
  const [cookies, setCookie] = useCookies(["theme"]);
  const navigate = useNavigate();

  const token = getToken().IdToken;
  const decodedToken = jwtDecode(token);

  const handleTheme = () => {
    setTheme(!theme);
    setCookie("theme", !theme ? "light" : "dark", { path: "/" });
  };

  return (
    <Space className="header-container">
      <Typography.Title
        level={5}
        style={{ cursor: "pointer" }}
        onClick={() => navigate(getRoutePath(ROUTES_ID.dashboard))}
      >
        Welcome {decodedToken?.name}
      </Typography.Title>

      <Space className="header-right-container">
        {isMobile && (
          <Button type="link" icon={<Menu />} onClick={() => setOpen(!open)} />
        )}
        <Button
          type="link"
          onClick={handleTheme}
          icon={!theme ? <Moon /> : <Sun />}
        />
      </Space>
    </Space>
  );
};

export default RTHeader;
