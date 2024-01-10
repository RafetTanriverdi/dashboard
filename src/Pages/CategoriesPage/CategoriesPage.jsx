import RTSider from '../../components/RTSider/RTSider'
import MainLayout from '../../layout/MainLayout/MainLayout'

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