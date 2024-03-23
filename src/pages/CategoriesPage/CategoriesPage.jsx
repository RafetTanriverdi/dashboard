import RTSider from "@rt/components/RTSider/RTSider"
import MainLayout from "@rt/layout/MainLayout/MainLayout"

const CategoriesPageContainer = () => {
  return (
    <div>CategoriesPage</div>
  )
}
const CategoriesPage = (params) => {
  const {title}=params.routeData;
  return (
    <>
    <MainLayout title={title} sider={<RTSider />} content={<CategoriesPageContainer />} />
    </>
  )
}

export default CategoriesPage