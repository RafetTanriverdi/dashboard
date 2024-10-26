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

export const RTHeatMap = () => {
  const { theme } = useThemeChangeStore();
  const [year, setYear] = useState(2024);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
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
        <Typography.Title level={5}>Daily Order Quantity</Typography.Title>
        <DatePicker
          style={{ width: "90px" }}
          inputReadOnly={false}
          value={dayjs(`${year}-01-01`)}
          onChange={(date) => setYear(dayjs(date).format("YYYY"))}
          picker="year"
        />
      </Space>

      <ResponsiveCalendar
        data={data}
        from={`${year}-06-01`}
        to={`${year}-12-31`}
        emptyColor={theme ? "#eeeeee" : "#333333"}
        colors={theme ? lightColors : darkColors}
        margin={{ top: 0, right: 10, bottom: 0, left: 25 }}
        yearLegendOffset={12}
        monthBorderColor={theme ? "#ffffff" : "#141414"}
        dayBorderWidth={2}
        dayBorderColor={theme ? "#ffffff" : "#141414"}
        legends={[
          {
            anchor: "bottom-right",
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

const data = [
  {
    value: 65,
    day: "2024-01-21",
  },
  {
    value: 261,
    day: "2024-08-31",
  },
  {
    value: 101,
    day: "2024-03-27",
  },
  {
    value: 386,
    day: "2024-09-25",
  },
  {
    value: 173,
    day: "2024-01-16",
  },
  {
    value: 250,
    day: "2024-07-05",
  },
  {
    value: 229,
    day: "2024-10-12",
  },
  {
    value: 198,
    day: "2024-10-02",
  },
  {
    value: 356,
    day: "2024-11-20",
  },
  {
    value: 100,
    day: "2024-02-26",
  },
  {
    value: 76,
    day: "2024-05-26",
  },
  {
    value: 318,
    day: "2024-10-27",
  },
  {
    value: 388,
    day: "2024-01-20",
  },
  {
    value: 315,
    day: "2024-04-11",
  },
  {
    value: 105,
    day: "2024-02-21",
  },
  {
    value: 94,
    day: "2024-06-21",
  },
  {
    value: 192,
    day: "2024-12-24",
  },
  {
    value: 335,
    day: "2024-04-17",
  },
  {
    value: 284,
    day: "2024-01-18",
  },
  {
    value: 348,
    day: "2024-08-22",
  },
  {
    value: 121,
    day: "2024-10-20",
  },
  {
    value: 133,
    day: "2024-01-22",
  },
  {
    value: 500,
    day: "2024-02-23",
  },
  {
    value: 600,
    day: "2024-09-27",
  },
  {
    value: 800,
    day: "2024-08-27",
  },
  {
    value: 700,
    day: "2024-08-26",
  },
  {
    value: 600,
    day: "2024-08-25",
  },
  {
    value: 500,
    day: "2024-08-24",
  },
  {
    value: 400,
    day: "2024-08-23",
  },
  {
    value: 300,
    day: "2024-08-22",
  },
  {
    value: 200,
    day: "2024-08-21",
  },
  {
    value: 100,
    day: "2024-08-20",
  },
  {
    value: 50,
    day: "2024-08-19",
  },
  {
    value: 10,
    day: "2024-08-18",
  },
  {
    value: 900,
    day: "2024-08-17",
  },
  {
    value: 900,
    day: "2024-08-16",
  },
];
