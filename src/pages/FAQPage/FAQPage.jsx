import MainLayout from "@rt/layout/MainLayout/MainLayout";
import RTSider from "@rt/components/RTSider/RTSider";

const FAQPageContainer = () => {
  return <div>FAQPage</div>;
};

const FAQPage = (params) => {
  const { title } = params.routeData;
  return (
    <>
      <MainLayout
        title={title}
        sider={<RTSider />}
        content={<FAQPageContainer />}
      />
    </>
  );
};

export default FAQPage;
