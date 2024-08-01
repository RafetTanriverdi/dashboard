import MainLayout from "@rt/layout/MainLayout/MainLayout";
import RTSider from "@rt/components/RTSider/RTSider";
import { Scheduler } from "devextreme-react/scheduler";
import { useEffect } from "react";
import { useThemeChangeStore } from "@rt/data/Theme/Theme";
import themes from "devextreme/ui/themes";

const calenderViews = ["day", "week", "month"];

const CalendarPageContainer = () => {
  const {theme}=useThemeChangeStore()

  useEffect(() => {
    const selectedTheme = !theme ? "generic.light" : "generic.dark";

    themes.ready(() => {
      themes.current(selectedTheme);
      
    });
  }, [theme]);

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
