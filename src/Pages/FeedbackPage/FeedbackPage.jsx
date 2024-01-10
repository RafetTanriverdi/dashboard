import RTSider from "../../components/RTSider/RTSider";
import MainLayout from "../../layout/MainLayout/MainLayout";

const FeedbackPageContainer = () => {
  return <div>FeedbackPage</div>;
};
const FeedbackPage = () => {
  return <MainLayout content={<FeedbackPageContainer />} sider={<RTSider />} />;
};

export default FeedbackPage;
