import MainLayout from "@rt/layout/MainLayout/MainLayout";
import RTSider from "@rt/components/RTSider/RTSider";

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
