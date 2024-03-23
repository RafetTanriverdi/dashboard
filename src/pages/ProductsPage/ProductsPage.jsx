import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import ProductList from "./page-components/ProductList/ProductList";
import "./ProductsPage.scss";
import { Typography } from "antd";
import { Space } from "antd";
import { NewProductButton } from "./page-components/NewProduct/NewProductDrawer";

const ProductsPageContainer = () => {
  return (
    <div className="product-list-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography.Title level={3}>Products</Typography.Title>
        <Space>
          <NewProductButton />
        </Space>
      </div>
      <ProductList className="product-list" />
    </div>
  );
};

const ProductsPage = (params) => {
  const { title } = params.routeData;
  console.log("title", params);
  return (
    <MainLayout
      title={title}
      sider={<RTSider />}
      content={<ProductsPageContainer />}
    />
  );
};

export default ProductsPage;
