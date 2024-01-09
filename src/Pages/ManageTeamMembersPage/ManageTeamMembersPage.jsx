import MainLayout from "../../Layout/MainLayout/MainLayout";
import RTSider from "../../Components/RTSider/RTSider";

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
