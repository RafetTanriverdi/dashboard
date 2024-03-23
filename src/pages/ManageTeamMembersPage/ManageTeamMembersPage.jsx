import MainLayout from "@rt/layout/MainLayout/MainLayout"
import RTSider from "@rt/components/RTSider/RTSider"

const ManageTeamMembersPageContainer = () => {
  return (
    <div>ManageTeamMembersPage</div>
  )
}

const ManageTeamMembersPage = (props) => {
  const { title } = props.routeData
  return (
    <>
      <MainLayout title={title} sider={<RTSider />} content={<ManageTeamMembersPageContainer />} />
    </>
  )
}

export default ManageTeamMembersPage