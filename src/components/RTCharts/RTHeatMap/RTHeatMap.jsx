import { ResponsiveCalendar } from "@nivo/calendar";
import { useThemeChangeStore } from "@rt/data/Theme/Theme";
import { ChartsDark } from "@rt/theme/DarkTheme/ChartsDarkTheme";
import { ChartsLight } from "@rt/theme/LightTheme/ChartsLightTheme";
import { Typography } from "antd";
import { Space } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useState } from "react";

const darkColors = [
  "#ffdede ",
  "#FF8080 ",
  "#FF4D4D ",
  "#FF1A1A ",
  "#E60000 ",
  "#B30000 ",
];
const lightColors = [
  "#D1E4FA",
  "#A8C8F0",
  "#7EACF3",
  "#5692E1",
  "#3277D0",
  "#0958D9",
];

const generateFakeVisitorData = () => {
  const startDate = new Date("2024-01-01"); 
  const today = new Date();
  const data = [];

  let currentDate = startDate;
  while (currentDate <= today) {
    const formattedDate = currentDate.toISOString().split("T")[0]; 
    const randomValue = Math.random() < 0.2 ? 0 : Math.floor(Math.random() * (1000 - 10 + 1)) + 10;

    data.push({
      day: formattedDate,
      value: randomValue,
    });

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

export const RTHeatMap = () => {
  const { theme } = useThemeChangeStore();
  const [year, setYear] = useState(2024);
  const [visitorData, setVisitorData] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    setVisitorData(generateFakeVisitorData());
  }, []);

  useEffect(() => {
    const svgGroup = document.querySelector(
      ".heat-map-container .ant-card-body g"
    );
    if (svgGroup && !isMobile) {
      svgGroup.setAttribute("transform", "translate(25, -50)");
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  return (
    <>
      <Space
        style={{
          width: "100%",
          justifyContent: "space-between",
          marginBottom: "0px",
        }}
      >
        <Typography.Title level={5}>Daily Visitor Data</Typography.Title>
        <DatePicker
          style={{ width: "90px" }}
          inputReadOnly={false}
          value={dayjs(`${year}-01-01`)}
          onChange={(date) => setYear(dayjs(date).format("YYYY"))}
          picker="year"
        />
      </Space>
      <ResponsiveCalendar
        data={visitorData}
        from={`${year}-06-01`}
        to={`${year}-12-31`}
        emptyColor={theme ? "#eeeeee" : "#333333"}
        colors={theme ? lightColors : darkColors}
        margin={{ top: -50, right: 10, bottom: 0, left: 25 }}
        yearLegendOffset={12}
        monthBorderColor={theme ? "#ffffff" : "#141414"}
        dayBorderWidth={2}
        dayBorderColor={theme ? "#ffffff" : "#141414"}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
        theme={theme ? ChartsLight : ChartsDark}
      />
    </>
  );
};
