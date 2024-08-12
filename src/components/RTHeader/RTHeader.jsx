/* eslint-disable no-unused-vars */
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { getToken } from "@rt/authentication/auth-utils";
import { useThemeChangeStore } from "@rt/data/Theme/Theme";
import { Button, Space } from "antd";
import { Typography } from "antd";
import { jwtDecode } from "jwt-decode";

import { useCookies } from "react-cookie";

const RTHeader = () => {
  const { theme, setTheme } = useThemeChangeStore();
  const [cookies, setCookie] = useCookies(["theme"]);
  
  const token=getToken().IdToken;
  const decodedToken =jwtDecode(token)
  console.log(decodedToken,'decodedToken');



  const handleTheme = () => {
    setTheme(!theme);
    // Tema değiştirildiğinde çerezi güncelle
    setCookie("theme", !theme ? "light" : "dark", { path: "/" });
  };

  return (
    <>
      <Space style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography.Title level={5}>Welcome {decodedToken?.name}</Typography.Title>
        <Button
          type="link"
          onClick={handleTheme}
          icon={!theme ? <MoonOutlined /> : <SunOutlined />}
        />
      </Space>
    </>
  );
};

export default RTHeader;
