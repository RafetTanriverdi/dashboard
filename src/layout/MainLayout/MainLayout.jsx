/* eslint-disable react-hooks/exhaustive-deps */
import { Breadcrumb, Layout } from "antd";
import "./MainLayout.scss";
import { Helmet } from "react-helmet";
import RTHeader from "@rt/components/RTHeader/RTHeader";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const { Sider, Content, Header } = Layout;

const MainLayout = ({ sider, content, title }) => {
  const initialState = localStorage.getItem("collapse") === "true";
  const [collapsed, setCollapsed] = useState(initialState);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const splitLocation = location.pathname.split("/");

  useEffect(() => {
    if (initialState) {
      setCollapsed(initialState);
      localStorage.setItem("collapse", initialState);
    } else {
      setCollapsed(false);
      localStorage.setItem("collapse", "false");
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  const handleCollapse = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    localStorage.setItem("collapse", newCollapsedState);
  };

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
            setOpen={handleCollapse}
            isMobile={isMobile}
          />
        </Header>
        <Layout>
          <Sider
            collapsible
            collapsed={initialState}
            onCollapse={() => handleCollapse()}
            breakpoint="lg"
            collapsedWidth={isMobile ? 0 : 50}
            width={250}
            trigger={isMobile && null}
            style={{ height: "100vh" }}
          >
            {sider}
          </Sider>
          <Content className="content" style={{ padding: "20px" }}>
            {isMobile && splitLocation.length === 2 && (
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
