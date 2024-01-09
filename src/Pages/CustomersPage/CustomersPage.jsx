import RTSider from '../../Components/RTSider/RTSider'
import MainLayout from '../../Layout/MainLayout/MainLayout'

const CustomerPageContainer = () => {
  return (
    <div>CustomerPage</div>
  )
}
const CustomerPage = () => {
  return (
    <MainLayout content={<CustomerPageContainer />} sider={<RTSider />} />
  )
}

export default CustomerPage