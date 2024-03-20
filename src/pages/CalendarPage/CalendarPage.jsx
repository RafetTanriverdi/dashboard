import MainLayout from "@ca/layout/MainLayout/MainLayout";
import RTSider from "@ca/components/RTSider/RTSider";

const CalendarPageContainer = () => {
  return <div>CalendarPage</div>;
};

const CalendarPage = (params) => {
  const {title}=params.routeData;
  return (
    <>
      <MainLayout title={title} sider={<RTSider />} content={<CalendarPageContainer />} />
    </>
  );
};

export default CalendarPage;
