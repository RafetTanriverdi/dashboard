import { useEffect } from "react";
import { Scheduler } from "devextreme-react/scheduler";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import RTHeader from "@rt/components/RTHeader/RTHeader";
import RTSider from "@rt/components/RTSider/RTSider";
import themes from "devextreme/ui/themes";
import { useRef } from "react";

const calenderViews = ["day", "week", "month"];

const CalendarPageContainer = ({ scheduler }) => {
  useEffect(() => {
    themes.ready(() => {
      scheduler.current.instance.repaint();
    });
  }, []);

  return (
    <>
      <Scheduler
        ref={scheduler}
        currentView="month"
        views={calenderViews}
        defaultCurrentView="month"
        height={600}
      />
    </>
  );
};

const CalendarPage = () => {
  const scheduler = useRef(null);
  return (
    <MainLayout
      content={
        <CalendarPageContainer scheduler={scheduler} />
      }
      header={<RTHeader scheduler={scheduler} />}
      sider={<RTSider />}
      title={"Calendar Page"}
    />
  );
};

export default CalendarPage;
