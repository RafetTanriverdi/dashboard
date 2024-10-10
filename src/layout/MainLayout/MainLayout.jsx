import { Breadcrumb, Layout } from "antd";
import "./MainLayout.scss";
import { Helmet } from "react-helmet";
import RTHeader from "@rt/components/RTHeader/RTHeader";
import { useState } from "react";
import { useEffect } from "react";

const { Sider, Content, Header } = Layout;

const MainLayout = ({ sider, content, title }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>

      <Layout className="container">
        <Header className="header">
          <RTHeader
            open={collapsed}
            setOpen={setCollapsed}
            isMobile={isMobile}
          />
        </Header>
        <Layout>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
            breakpoint="lg"
            collapsedWidth={isMobile ? 0 : 50}
            width={250}
            trigger={isMobile && null}
            style={{ height: "100vh" }}
          >
            {sider}
          </Sider>
          <Content className="content" style={{ padding: "20px" }}>
            {isMobile && (
              <Breadcrumb
                items={[
                  {
                    href: "/",
                    title: "Home",
                  },
                  {
                    title: title,
                  },
                ]}
              />
            )}

            {content}
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
