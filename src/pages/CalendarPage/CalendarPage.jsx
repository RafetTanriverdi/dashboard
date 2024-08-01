import { useEffect, useRef } from "react";
import { Scheduler } from "devextreme-react/scheduler";
import themes from "devextreme/ui/themes";
import { useThemeChangeStore } from "@rt/data/Theme/Theme";
import MainLayout from "@rt/layout/MainLayout/MainLayout";
import RTHeader from "@rt/components/RTHeader/RTHeader";
import RTSider from "@rt/components/RTSider/RTSider";

const calenderViews = ["day", "week", "month"];

const CalendarPageContainer = () => {
  const { theme } = useThemeChangeStore();
  const schedulerRef = useRef(null);

  useEffect(() => {
    const selectedTheme = theme !== undefined && theme !== null ? (theme ? "generic.dark" : "generic.light") : "generic.light";

    themes.ready(() => {
      themes.current(selectedTheme);
      if (schedulerRef.current) {
        schedulerRef.current.instance.repaint();
      }
    });
  }, [theme]);

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
