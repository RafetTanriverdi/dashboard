import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import ProductList from "./page-components/ProductList/ProductList";
import "./ProductsPage.scss";
import { Typography } from "antd";
import { Space } from "antd";
import { NewProductButton } from "./page-components/NewProduct/NewProductButton";
import axiosInstance from "@rt/network/httpRequester";
import { useQuery } from "@tanstack/react-query";
import { ENDPOINTS } from "@rt/network/endpoints";
import RTAuthContainer from "@rt/components/RTAuthContainer/RTAuthContainer";
import { Permissions } from "@rt/utils/permission-util";

const ProductsPageContainer = () => {
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () =>
      axiosInstance.get(ENDPOINTS.CATEGORIES.LIST).then((res) => res.data),
  });
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
          <NewProductButton categories={categories} />
        </Space>
      </div>
      <RTAuthContainer
        action={Permissions.products.actions.read}
        subject={Permissions.products.subject}
      >
        <ProductList className="product-list" categoriesData={categories} />
      </RTAuthContainer>
    </div>
  );
};

const ProductsPage = (params) => {
  const { title } = params.routeData;
  return (
    <MainLayout
      title={title}
      sider={<RTSider />}
      content={<ProductsPageContainer />}
    />
  );
};

export default ProductsPage;
