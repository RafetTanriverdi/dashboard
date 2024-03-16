import { Layout } from "antd";
import "./PublicLayout.scss";

const { Content, Footer } = Layout;

const PublicLayout = ({  footer, content }) => {
  return (
    <Layout className="container">
      <Content className="content">{content}</Content>
      {footer && <Footer className="footer">{footer}</Footer>}
    </Layout>
  );
};

export default PublicLayout;
