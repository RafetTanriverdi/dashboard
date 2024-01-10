import RTSider from '../../components/RTSider/RTSider'
import MainLayout from '../../layout/MainLayout/MainLayout'

const ProductsPageContainer = () => {
  return (
    <div>ProductsPage</div>
  )
}
const ProductsPage = () => {
  return (
    <MainLayout content={<ProductsPageContainer />} sider={<RTSider />} />
  )
}

export default ProductsPage