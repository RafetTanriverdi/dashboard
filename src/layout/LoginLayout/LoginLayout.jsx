import { Layout } from "antd";
const { Content } = Layout;
import "./LoginLayout.scss";

const LoginLayout = ({ content }) => {
  return (
    <Layout>
      <Content
       className="login-content-container"
      >
        {content}
      </Content>
    </Layout>
  );
};

export default LoginLayout;
