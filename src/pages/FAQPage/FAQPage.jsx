import RTSider from "@rt/components/RTSider/RTSider";
import MainLayout from "@rt/layout/MainLayout/MainLayout";


const FAQPageContainer = () => {
  return <div>FAQPage</div>;
};

const FAQPage = (params) => {
  const { title } = params.routeData;
  return (
    <>
      <MainLayout title={title} sider={<RTSider />} content={<FAQPageContainer />} />
    </>
  );
};

export default FAQPage;
