import { useEffect } from "react";
import { Scheduler } from "devextreme-react/scheduler";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import RTHeader from "@rt/components/RTHeader/RTHeader";
import RTSider from "@rt/components/RTSider/RTSider";
import themes from "devextreme/ui/themes";
import { useRef } from "react";

const calenderViews = ["day", "week", "month"];

const CalendarPageContainer = () => {

  const schaduler=useRef(null)

  useEffect(() => {
    themes.ready(() => {
      schaduler.current.instance.repaint();
  });

  }, []);

  return (
    <>
      <Scheduler
      ref={schaduler}
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
