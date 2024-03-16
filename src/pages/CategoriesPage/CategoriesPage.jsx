import RTSider from "@ca/components/RTSider/RTSider"
import MainLayout from "@ca/layout/MainLayout/MainLayout"

const CategoriesPageContainer = () => {
  return (
    <div>CategoriesPage</div>
  )
}
const CategoriesPage = () => {
  return (
    <>
    <MainLayout sider={<RTSider />} content={<CategoriesPageContainer />} />
    </>
  )
}

export default CategoriesPage