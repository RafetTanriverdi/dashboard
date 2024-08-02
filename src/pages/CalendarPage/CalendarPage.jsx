import { useEffect, useRef } from "react";
import { Scheduler } from "devextreme-react/scheduler";
import themes from "devextreme/ui/themes";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import RTHeader from "@rt/components/RTHeader/RTHeader";
import RTSider from "@rt/components/RTSider/RTSider";
import { theme } from "antd";

const calenderViews = ["day", "week", "month"];

const CalendarPageContainer = () => {
  const schedulerRef = useRef(null);

  useEffect(() => {
    themes.ready(() => {
      schedulerRef.current.instance.repaint();
    });
    themes.current(theme ? "generic.dark" : "generic.light");
  }, []);

  
  return (
    <>
    
      <Scheduler
        ref={schedulerRef}
        currentView="month"
        views={calenderViews}
        defaultCurrentView="month"
        height={600}
      />
    </>
  );
};

const CalendarPage = () => {
  return (
    <MainLayout
      content={<CalendarPageContainer />}
      header={<RTHeader />}
      sider={<RTSider />}
      title={"Calendar Page"}
    />
  );
};
export default CalendarPage;
