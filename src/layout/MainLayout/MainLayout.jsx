/* eslint-disable react-hooks/exhaustive-deps */
import { Breadcrumb, Layout } from "antd";
import "./MainLayout.scss";
import { Helmet } from "react-helmet";
import RTHeader from "@rt/components/RTHeader/RTHeader";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const { Sider, Content, Header } = Layout;

const MainLayout = ({ sider, content, title }) => {
  const initialSiderCollapsed =
    localStorage.getItem("siderCollapsed") || window.innerWidth < 768;

  const [collapsed, setCollapsed] = useState(initialSiderCollapsed);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const splitLocation = location.pathname.split("/");

  const handleResize = () => {
    const isNowMobile = window.innerWidth < 768;
    setIsMobile(isNowMobile);

    if (isNowMobile && !collapsed) {
      setCollapsed(true);
    } else if (!isNowMobile && collapsed) {
      setCollapsed(false);
    }
  };

  useEffect(() => {
    const savedCollapsed = localStorage.getItem("siderCollapsed");
    setCollapsed(savedCollapsed);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCollapse = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    localStorage.setItem("siderCollapsed", newCollapsedState); // Durumu localStorage'a yazıyoruz
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
            collapsed={collapsed}
            onCollapse={handleCollapse}
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
