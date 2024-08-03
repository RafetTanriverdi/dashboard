import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { UserContext } from "@rt/context/UserContext/UserContext";
import { useThemeChangeStore } from "@rt/data/Theme/Theme";
import { Button, Space } from "antd";
import { Typography } from "antd";
import { useContext } from "react";

import { useCookies } from "react-cookie";

const RTHeader = () => {
  const {userData}=useContext(UserContext);
  const { theme, setTheme } = useThemeChangeStore();
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(["theme"]);



  const handleTheme = () => {
    setTheme(!theme);
    // Tema değiştirildiğinde çerezi güncelle
    setCookie("theme", !theme ? "light" : "dark", { path: "/" });
  };

  return (
    <>
      <Space style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography.Title level={5}>Welcome {userData?.name}</Typography.Title>
        <Button
          type="link"
          onClick={handleTheme}
          icon={theme ? <MoonOutlined /> : <SunOutlined />}
        />
      </Space>
    </>
  );
};

export default RTHeader;
