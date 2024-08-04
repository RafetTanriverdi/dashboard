import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import { Space } from "antd";
import { Typography } from "antd";
import "./UsersPage.scss";
import UserList from "./page-components/UserList/UserList";
import { NewUserButton } from "./page-components/NewUser/NewUserButton";

const UsersPageContainer = () => {
  return(

    <div className="customer-list-container">
    <div className="customer-list-header">
      <Typography.Title level={3}>Users</Typography.Title>
      <Space> <NewUserButton /></Space>
    </div>
    <UserList className="customer-list" />
  </div>
  )
};

const UsersPage = (params) => {
  const { title } = params.routeData;
  return (
    <MainLayout
      title={title}
      sider={<RTSider />}
      content={<UsersPageContainer />}
    />
  );
};

export default UsersPage;
