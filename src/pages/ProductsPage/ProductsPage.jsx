import RTSider from "@ca/components/RTSider/RTSider";
import MainLayout from "@ca/layout/MainLayout/MainLayout";
import ProductList from "./page-components/ProductList/ProductList";

const ProductsPageContainer = () => {
  return <ProductList />;
};

const ProductsPage = () => {
  return <MainLayout sider={<RTSider />} content={<ProductsPageContainer />} />;
};

export default ProductsPage;
