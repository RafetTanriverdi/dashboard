import { Layout } from "antd";
import './CenterLayout.scss'
const { Content } = Layout;


const CenterLayout = ({ content }) => {
  return (
    <Layout className="container">
      <Content
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {content}
      </Content>
    </Layout>
  );
};

export default CenterLayout;
