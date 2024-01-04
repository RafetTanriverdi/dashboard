import React from 'react'
import RTSider from '../../Components/RTSider/RTSider'
import MainLayout from '../../Layout/MainLayout/MainLayout'

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