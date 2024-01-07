import { Layout } from "antd";
import "./PublicLayout.scss";

const { Content, Header, Footer } = Layout;

const PublicLayout = ({ header, footer, content }) => {
  return (
    <Layout className="container">
      <Header className="header">{header}</Header>
      <Content className="content">{content}</Content>
      {footer && <Footer className="footer">{footer}</Footer>}
    </Layout>
  );
};

export default PublicLayout;
