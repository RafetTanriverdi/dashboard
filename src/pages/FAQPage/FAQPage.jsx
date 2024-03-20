import MainLayout from "@ca/layout/MainLayout/MainLayout";
import RTSider from "@ca/components/RTSider/RTSider";

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
