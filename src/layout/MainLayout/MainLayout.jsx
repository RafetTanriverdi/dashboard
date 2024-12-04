/* eslint-disable react-hooks/exhaustive-deps */
import { Breadcrumb, Layout } from "antd";
import "./MainLayout.scss";
import { Helmet } from "react-helmet";
import RTHeader from "@rt/components/RTHeader/RTHeader";
import { useEffect } from "react";
import { HomeOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  handleResize,
  initialize,
  toggleCollapse,
} from "@rt/store/sidebarSlice";

const { Sider, Content, Header } = Layout;

const MainLayout = ({ sider, content, title }) => {
  const location = useLocation();
  const splitLocation = location.pathname.split("/");

  const dispatch = useDispatch();
  const { isCollapsed, isMobile } = useSelector((state) => state.sidebar);

  useEffect(() => {
    dispatch(initialize());
    console.log(
      "Sidebar initialized with value:",
      localStorage.getItem("collapse")
    );
  }, [dispatch]);

  useEffect(() => {
    const resizeListener = () => dispatch(handleResize());
    if (typeof window !== "undefined") {
      resizeListener();
      window.addEventListener("resize", resizeListener);
      return () => window.removeEventListener("resize", resizeListener);
    }
  }, [dispatch]);

  useEffect(() => {
    console.log("Redux isCollapsed state:", isCollapsed);
    console.log("LocalStorage collapse value:", localStorage.getItem("collapse"));
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
            setOpen={() => dispatch(toggleCollapse())}
            isMobile={isMobile}
          />
        </Header>
        <Layout>
          <Sider
            collapsible
            collapsed={isCollapsed}
            onCollapse={() => dispatch(toggleCollapse())}
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
