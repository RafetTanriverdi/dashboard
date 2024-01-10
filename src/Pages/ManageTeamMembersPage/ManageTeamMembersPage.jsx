import MainLayout from "../../layout/MainLayout/MainLayout";
import RTSider from "../../components/RTSider/RTSider";

const ManageTeamMembersPageContainer = () => {
  return <div>ManageTeamMembersPage</div>;
};
const ManageTeamMembersPage = () => {
  return (
    <MainLayout
      content={<ManageTeamMembersPageContainer />}
      sider={<RTSider />}
    />
  );
};

export default ManageTeamMembersPage;
