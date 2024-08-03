/* eslint-disable no-unused-vars */
import { Layout } from "antd";
import React from "react";
import "./MainLayout.scss";
import { Helmet } from "react-helmet";
import RTHeader from "@rt/components/RTHeader/RTHeader";
import { useUserDataStore } from "@rt/data/User/UserData";
import { useContext } from "react";
import { UserContext } from "@rt/context/UserContext/UserContext";

const { Sider, Content, Header } = Layout;
const MainLayout = ({ sider, content, title, header }) => {
const {userData}=useContext(UserContext)
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title && `${title} | ${userData?.name}`}</title>
      </Helmet>

      <Layout className="container">
        <Sider className="sidebar">{sider}</Sider>
        <Layout className="main-layout">
          <Header className="header">
            <RTHeader />
          </Header>
          <Content className="content">{content}</Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
