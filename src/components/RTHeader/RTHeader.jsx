/* eslint-disable no-unused-vars */
import { MenuOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { getToken } from "@rt/authentication/auth-utils";
import { useThemeChangeStore } from "@rt/data/Theme/Theme";
import { Button, Space } from "antd";
import { Typography } from "antd";
import { jwtDecode } from "jwt-decode";

import { useCookies } from "react-cookie";

const RTHeader = ({ open, setOpen, isMobile }) => {
  const { theme, setTheme } = useThemeChangeStore();
  const [cookies, setCookie] = useCookies(["theme"]);

  const token = getToken().IdToken;
  const decodedToken = jwtDecode(token);

  const handleTheme = () => {
    setTheme(!theme);
    setCookie("theme", !theme ? "light" : "dark", { path: "/" });
  };

  return (
    <>
      <Space style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography.Title level={5}>
          Welcome {decodedToken?.name}
        </Typography.Title>

        <Space>
          {isMobile && (
            <Button
              type="link"
              icon={<MenuOutlined onClick={() => setOpen(!open)} />}
            />
          )}
          <Button
            type="link"
            onClick={handleTheme}
            icon={!theme ? <MoonOutlined /> : <SunOutlined />}
          />
        </Space>
      </Space>
    </>
  );
};

export default RTHeader;
