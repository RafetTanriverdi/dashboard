/* eslint-disable no-unused-vars */
import { Layout } from "antd";
import React from "react";
import "./MainLayout.scss";
import { Helmet } from "react-helmet";
import RTHeader from "@rt/components/RTHeader/RTHeader";
import { useUserDataStore } from "@rt/data/User/UserData";
import { useContext } from "react";
import { UserContext } from "@rt/context/UserContext/UserContext";
import { getToken } from "@rt/authentication/auth-utils";
import { jwtDecode } from "jwt-decode";

const { Sider, Content, Header } = Layout;
const MainLayout = ({ sider, content, title }) => {
  const token=getToken().IdToken;
  const decodedToken =jwtDecode(token)
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title && `${title} | ${decodedToken?.name}`}</title>
      </Helmet>

      <Layout className="container">  <Header className="header">
            <RTHeader />
          </Header>
     
        <Layout className="main-layout">
        <Sider className="sidebar">{sider}</Sider>
          <Content className="content">{content}</Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
