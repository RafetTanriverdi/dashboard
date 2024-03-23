/* eslint-disable no-unused-vars */
import { Layout } from "antd";
import React from "react";
import "./MainLayout.scss";
import { Helmet } from "react-helmet";
import RTHeader from "@rt/components/RTHeader/RTHeader";

const { Sider, Content, Header } = Layout;
const MainLayout = ({ sider, content, title, header }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title &&`${title} | Rafet Tanriverdi`}</title>
      </Helmet>

      <Layout className="container">
        <Sider className="sidebar">{sider}</Sider>
        <Layout className="main-layout">
           <Header className="header"><RTHeader/></Header> 
          <Content className="content">{content}</Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
