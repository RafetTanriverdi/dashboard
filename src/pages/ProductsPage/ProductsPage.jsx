import RTSider from "@ca/components/RTSider/RTSider";
import MainLayout from "@ca/layout/MainLayout/MainLayout";

const ProductsPageContainer = () => {
  return <div>ProductsPage</div>;
};

const ProductsPage = () => {
  return <MainLayout sider={<RTSider />} content={<ProductsPageContainer />} />;
};

export default ProductsPage;
