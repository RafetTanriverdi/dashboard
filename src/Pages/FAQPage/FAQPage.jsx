import RTSider from '../../components/RTSider/RTSider'
import MainLayout from '../../layout/MainLayout/MainLayout'

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