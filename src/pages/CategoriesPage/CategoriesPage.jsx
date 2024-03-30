import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import { Space } from "antd";
import { Typography } from "antd";
import { NewCategoryButton } from "./page-components/NewCategory/NewCategoryButton";
import CategoryList from "./page-components/CategoryList/CategoryList";
import "./CategoriesPage.scss";

const CategoriesPageContainer = () => {
  return (
    <div className="category-list-container">
      <div className="category-list-header"
        
      >
        <Typography.Title level={3}>Categories</Typography.Title>
        <Space>
          <NewCategoryButton />
        </Space>
      </div>
      <CategoryList  className='category-list'/>
    </div>
  );
};
const CategoriesPage = (params) => {
  const { title } = params.routeData;
  return (
    <>
      <MainLayout
        title={title}
        sider={<RTSider />}
        content={<CategoriesPageContainer />}
      />
    </>
  );
};

export default CategoriesPage;
