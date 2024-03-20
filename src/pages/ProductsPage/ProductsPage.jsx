import RTSider from "@ca/components/RTSider/RTSider";
import MainLayout from "@ca/layout/MainLayout/MainLayout";
import ProductList from "./page-components/ProductList/ProductList";
import "./ProductsPage.scss";
import { Typography } from "antd";
import { RTButton } from "@ca/components/RTButton";
import { Space } from "antd";

const ProductsPageContainer = () => {
  return (
    <div className="product-list-container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography.Title level={3}>Products</Typography.Title>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RTButton.login text="Add New Product" />
          <RTButton.login text="Add New Product" />
        </div>
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
