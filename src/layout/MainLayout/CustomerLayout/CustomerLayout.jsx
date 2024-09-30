import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "../MainLayout";
import { Breadcrumb, Layout } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

const { Content } = Layout;
const CustomerLayoutContainer = ({ content, title }) => {
  return (
    <Layout style={{ display: "flex" }}>
      <Breadcrumb
        style={{ margin: "10px 15px" }}
        items={[
          {
            href: "/",
            title: <HomeOutlined />,
          },
          {
            href: "/customers",
            title: (
              <>
                <UserOutlined />
                <span>Customers</span>
              </>
            ),
          },
          {
            title: (`Customer: ${title}`),
          },
          
        ]}
      />
      <Layout>
        <Content>{content}</Content>
      </Layout>
    </Layout>
  );
};

const CustomerLayout = ({ title, content }) => {
  return (
    <MainLayout
      content={<CustomerLayoutContainer content={content} title={title} />}
      title={`Customer: ${title}`}
      sider={<RTSider />}
    />
  );
};

export default CustomerLayout;
