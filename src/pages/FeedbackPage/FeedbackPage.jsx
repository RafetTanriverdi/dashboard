import MainLayout from "@rt/layout/MainLayout/MainLayout";
import RTSider from "@rt/components/RTSider/RTSider";

const FeedbackPageContainer = () => {
  return <div>FeedbackPage</div>;
};

const FeedbackPage = (props) => {

  const { title } = props.routeData;
  
  return (
    <>
      <MainLayout title={title} sider={<RTSider />} content={<FeedbackPageContainer />} />
    </>
  );
};

export default FeedbackPage;
