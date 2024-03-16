import MainLayout from "@ca/layout/MainLayout/MainLayout";
import RTSider from "@ca/components/RTSider/RTSider";

const FeedbackPageContainer = () => {
  return <div>FeedbackPage</div>;
};

const FeedbackPage = () => {
  return (
    <>
      <MainLayout sider={<RTSider />} content={<FeedbackPageContainer />} />
    </>
  );
};

export default FeedbackPage;
