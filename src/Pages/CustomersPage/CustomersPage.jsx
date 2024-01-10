import RTSider from '../../components/RTSider/RTSider'
import MainLayout from '../../layout/MainLayout/MainLayout'
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