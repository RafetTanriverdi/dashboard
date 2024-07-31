import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useThemeChangeStore } from "@rt/data/Theme/Theme";
import { useUserDataStore } from "@rt/data/User/UserData";
import { Button, Space } from "antd";
import { Typography } from "antd";
import themes from "devextreme/ui/themes";

const RTHeader = () => {
  const { userData } = useUserDataStore();
  const { username } = userData;
  const { theme, setTheme } = useThemeChangeStore();

  const changeTheme = () => {
    const newTheme = !theme;
    setTheme(newTheme);
    themes.current(newTheme ? "generic.light" : "generic.dark");
  };

  return (
    <>
      <Space style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography.Title level={5}>Welcome {username}</Typography.Title>
        <Button
          type="link"
          onClick={changeTheme}
          icon={theme ? <MoonOutlined /> : <SunOutlined />}
        />
      </Space>
    </>
  );
};

export default RTHeader;
