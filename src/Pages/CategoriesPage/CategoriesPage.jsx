import RTSider from '../../Components/RTSider/RTSider'
import MainLayout from '../../Layout/MainLayout/MainLayout'

const CategoriesPageContainer = () => {
  return (
    <div>CategoriesPage</div>
  )
}
const CategoriesPage = () => {
  return (
    <MainLayout content={<CategoriesPageContainer />} sider={<RTSider />} />
  )
}

export default CategoriesPage