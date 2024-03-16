import MainLayout from "@ca/layout/MainLayout/MainLayout";
import RTSider from "@ca/components/RTSider/RTSider";

const CalendarPageContainer = () => {
  return <div>CalendarPage</div>;
};

const CalendarPage = () => {
  return (
    <>
      <MainLayout sider={<RTSider />} content={<CalendarPageContainer />} />
    </>
  );
};

export default CalendarPage;
