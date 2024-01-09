import RTSider from "../../Components/RTSider/RTSider";
import MainLayout from "../../Layout/MainLayout/MainLayout";

const FeedbackPageContainer = () => {
  return <div>FeedbackPage</div>;
};
const FeedbackPage = () => {
  return <MainLayout content={<FeedbackPageContainer />} sider={<RTSider />} />;
};

export default FeedbackPage;
