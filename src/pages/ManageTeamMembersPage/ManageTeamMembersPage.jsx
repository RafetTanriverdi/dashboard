import MainLayout from "@ca/layout/MainLayout/MainLayout"
import RTSider from "@ca/components/RTSider/RTSider"
const ManageTeamMembersPageContainer = () => {
  return (
    <div>ManageTeamMembersPage</div>
  )
}

const ManageTeamMembersPage = () => {
  return (
    <>
      <MainLayout sider={<RTSider />} content={<ManageTeamMembersPageContainer />} />
    </>
  )
}

export default ManageTeamMembersPage