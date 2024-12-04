/* eslint-disable react-hooks/exhaustive-deps */
import { Breadcrumb, Layout } from "antd";
import "./MainLayout.scss";
import { Helmet } from "react-helmet";
import RTHeader from "@rt/components/RTHeader/RTHeader";
import { useEffect } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { useSidebarStore } from "@rt/data/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";

const { Sider, Content, Header } = Layout;

const MainLayout = ({ sider, content, title }) => {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");
  const { initialize, isCollapsed, isMobile, handleResize, toggleCollapse } =
    useSidebarStore();

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.log("Sidebar status:", isCollapsed);
  }, [isCollapsed]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>

      <Layout className="container">
        <Header className="header">
          <RTHeader
            open={isCollapsed}
            setOpen={toggleCollapse}
            isMobile={isMobile}
          />
        </Header>
        <Layout>
          <Sider
            collapsible
            collapsed={isCollapsed}
            onCollapse={toggleCollapse}
            breakpoint="lg"
            collapsedWidth={isMobile ? 0 : 50}
            width={isMobile ? "100%" : 250}
            trigger={isMobile && null}
            style={{ height: "100vh" }}
          >
            {sider}
          </Sider>
          <Content className="content" style={{ padding: "20px" }}>
            {isMobile && splitLocation.length === 2 && (
              <Breadcrumb
                style={{ marginBottom: "5px" }}
                items={[
                  {
                    title: <HomeOutlined />,
                    href: "/",
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
