/* eslint-disable no-unused-vars */
import { Layout } from "antd";
import React from "react";
import "./MainLayout.scss";

const { Sider, Content } = Layout;
const MainLayout = ({  sider, content }) => {
  return (
    <Layout className="container">
      <Layout className="center-container">
        <Sider className="sidebar">{sider}</Sider>
        <Content className="content">{content}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
