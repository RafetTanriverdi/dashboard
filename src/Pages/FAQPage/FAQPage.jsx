import RTSider from '../../Components/RTSider/RTSider'
import MainLayout from '../../Layout/MainLayout/MainLayout'

const FAQPageContainer = () => {
  return (
    <div>FAQPage</div>
  )
}
const FAQPage = () => {
  return (
    <MainLayout content={<FAQPageContainer />} sider={<RTSider />} />
  )
}

export default FAQPage