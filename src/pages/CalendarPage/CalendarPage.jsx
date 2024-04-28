import MainLayout from "@rt/layout/MainLayout/MainLayout";
import RTSider from "@rt/components/RTSider/RTSider";
import { Scheduler } from "devextreme-react/scheduler";

const calenderViews = ["day", "week", "month"];

const CalendarPageContainer = () => {
  return (
    <>
      <Scheduler
        currentView="month"
        views={calenderViews}
    
        defaultCurrentView="month"
        height={600}
      ></Scheduler>
    </>
  );
};

const CalendarPage = (params) => {
  const { title } = params.routeData;
  return (
    <>
      <MainLayout
        title={title}
        sider={<RTSider />}
        content={<CalendarPageContainer />}
      />
    </>
  );
};

export default CalendarPage;
