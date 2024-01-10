import { Spin } from "antd";
import "./PageLoading.scss";

const PageLoading = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        background:'#F5F5F5'
      }}
    >
      <Spin tip="Loading..." size="large">
        <div className="content-loading" />
      </Spin>
    </div>
  );
};

export default PageLoading;
