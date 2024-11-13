import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "../MainLayout";
import { Breadcrumb, Button, Layout } from "antd";
import { ArrowLeftOutlined, HomeOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getRoutePath } from "@rt/routing/routes";
import { useDeviceStore } from "@rt/data/Device/mobile";

const { Content } = Layout;
const CustomerLayoutContainer = ({ content, title }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isMobile } = useDeviceStore();
  const splitNavigate = location.pathname.split("/");
  const aimLocation = splitNavigate[splitNavigate.length - 2];

  return (
    <Layout style={{ display: "flex" }}>
      <div style={{ display: "flex", alignItems: "center" ,justifyContent:`${isMobile&&'space-between'}`}}>
        <Button
          icon={<ArrowLeftOutlined />}
          type="link"
          onClick={() => navigate(getRoutePath(aimLocation))}
        />
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
                  <span>Customers</span>
                </>
              ),
            },
            {
              title: `Customer: ${title}`,
            },
          ]}
        />
      </div>
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
