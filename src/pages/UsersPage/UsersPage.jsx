import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import { Space } from "antd";
import { Typography } from "antd";
import "./UsersPage.scss";
import UserList from "./page-components/UserList/UserList";
import { NewUserButton } from "./page-components/NewUser/NewUserButton";
import { Permissions } from "@rt/utils/permission-util";
import RTAuthContainer from "@rt/components/RTAuthContainer/RTAuthContainer";

const UsersPageContainer = () => {
  return (
    <div className="customer-list-container">
      <div className="customer-list-header">
        <Typography.Title level={3}>Users</Typography.Title>
        <Space>
          <NewUserButton />
        </Space>
      </div>
      <RTAuthContainer
        action={Permissions.users.actions.read}
        subject={Permissions.users.subject}
      >
        <UserList className="customer-list" />
      </RTAuthContainer>
    </div>
  );
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
