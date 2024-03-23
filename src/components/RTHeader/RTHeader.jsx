import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useThemeChangeStore } from "@rt/data/Theme/Theme";
import { UseUserDataStore } from "@rt/data/User/UserData";
import { Button, Space } from "antd";
import { Typography } from "antd";

const RTHeader = () => {
  const { userData } = UseUserDataStore();
  const { username } = userData;
  const { theme, changeTheme } = useThemeChangeStore();

  return (
    <>
      <Space style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography.Title level={5}>Welcome {username}</Typography.Title>
        <Button
          type="link"
          onClick={() => changeTheme()}
          icon={theme ? <MoonOutlined /> : <SunOutlined />}
        />
      </Space>
    </>
  );
};

export default RTHeader;
