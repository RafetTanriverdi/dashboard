import { Layout } from "antd";
import "./PublicLayout.scss";
import { Helmet } from "react-helmet";

const { Content, Footer } = Layout;

const PublicLayout = ({  footer, content,title }) => {

  return (<>
  <Helmet>
    <meta charSet="utf-8" />
    <title>{`${title} `}</title>
  </Helmet>
    <Layout className="container">
      <Content className="content">{content}</Content>
      {footer && <Footer className="footer">{footer}</Footer>}
    </Layout>
  </>
  );
};

export default PublicLayout;
