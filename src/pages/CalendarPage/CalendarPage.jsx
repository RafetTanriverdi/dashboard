import { useEffect, useRef } from "react";
import { Scheduler } from "devextreme-react/scheduler";
import themes from "devextreme/ui/themes";
import { useThemeChangeStore } from "@rt/data/Theme/Theme";

const calenderViews = ["day", "week", "month"];

const CalendarPageContainer = () => {
  const { theme } = useThemeChangeStore();
  const schedulerRef = useRef(null);

  useEffect(() => {
    const selectedTheme = theme ? "generic.dark" : "generic.light";

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

export default CalendarPageContainer;
