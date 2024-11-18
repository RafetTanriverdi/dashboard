import { ResponsiveTimeRange } from "@nivo/calendar";
import { useThemeChangeStore } from "@rt/data/Theme/Theme";
import { ChartsDark } from "@rt/theme/DarkTheme/ChartsDarkTheme";
import { ChartsLight } from "@rt/theme/LightTheme/ChartsLightTheme";

const RTTimeRange = () => {
    const {theme} = useThemeChangeStore();
  return (
    <ResponsiveTimeRange
    theme={theme ? ChartsLight : ChartsDark}
      data={data}
      from="2018-04-01"
      to="2018-10-12"
      emptyColor="#eeeeee"
      colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
      margin={{ top: 40, right: 40, bottom: 100, left: 40 }}
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          justify: false,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
          translateX: -60,
          translateY: -60,
          symbolSize: 20,
        },
      ]}
    />
  );
};

export default RTTimeRange;
const data = [
  {
    value: 281,
    day: "2018-05-03",
  },
  {
    value: 53,
    day: "2018-07-19",
  },
  {
    value: 23,
    day: "2018-04-12",
  },
  {
    value: 318,
    day: "2018-06-25",
  },
  {
    value: 126,
    day: "2018-07-13",
  },
  {
    value: 65,
    day: "2018-06-22",
  },
  {
    value: 240,
    day: "2018-06-19",
  },
  {
    value: 39,
    day: "2018-06-30",
  },
  {
    value: 381,
    day: "2018-06-26",
  },
  {
    value: 144,
    day: "2018-06-20",
  },
  {
    value: 159,
    day: "2018-04-21",
  },
  {
    value: 291,
    day: "2018-06-29",
  },
  {
    value: 44,
    day: "2018-08-02",
  },
  {
    value: 335,
    day: "2018-05-08",
  },
  {
    value: 304,
    day: "2018-07-30",
  },
  {
    value: 270,
    day: "2018-04-08",
  },
  {
    value: 53,
    day: "2018-05-01",
  },
  {
    value: 124,
    day: "2018-05-16",
  },
  {
    value: 228,
    day: "2018-06-24",
  },
  {
    value: 327,
    day: "2018-06-15",
  },
  {
    value: 58,
    day: "2018-07-03",
  },
  {
    value: 158,
    day: "2018-06-13",
  },
  {
    value: 331,
    day: "2018-05-27",
  },
  {
    value: 266,
    day: "2018-05-21",
  },
  {
    value: 150,
    day: "2018-08-11",
  },
  {
    value: 52,
    day: "2018-07-21",
  },
  {
    value: 66,
    day: "2018-04-20",
  },
  {
    value: 260,
    day: "2018-07-31",
  },
  {
    value: 368,
    day: "2018-04-19",
  },
  {
    value: 222,
    day: "2018-06-04",
  },
  {
    value: 172,
    day: "2018-07-22",
  },
  {
    value: 69,
    day: "2018-05-10",
  },
  {
    value: 11,
    day: "2018-07-10",
  },
  {
    value: 143,
    day: "2018-06-27",
  },
  {
    value: 326,
    day: "2018-05-13",
  },
  {
    value: 82,
    day: "2018-04-25",
  },
  {
    value: 321,
    day: "2018-07-11",
  },
  {
    value: 151,
    day: "2018-04-03",
  },
  {
    value: 243,
    day: "2018-07-27",
  },
  {
    value: 55,
    day: "2018-05-26",
  },
  {
    value: 73,
    day: "2018-06-08",
  },
  {
    value: 110,
    day: "2018-04-24",
  },
  {
    value: 129,
    day: "2018-05-22",
  },
  {
    value: 372,
    day: "2018-05-24",
  },
  {
    value: 363,
    day: "2018-04-13",
  },
  {
    value: 170,
    day: "2018-05-05",
  },
  {
    value: 49,
    day: "2018-08-06",
  },
  {
    value: 261,
    day: "2018-07-09",
  },
  {
    value: 286,
    day: "2018-07-28",
  },
  {
    value: 0,
    day: "2018-07-18",
  },
  {
    value: 197,
    day: "2018-05-29",
  },
  {
    value: 10,
    day: "2018-06-06",
  },
  {
    value: 26,
    day: "2018-07-07",
  },
  {
    value: 340,
    day: "2018-08-01",
  },
  {
    value: 367,
    day: "2018-05-09",
  },
  {
    value: 378,
    day: "2018-06-28",
  },
  {
    value: 359,
    day: "2018-04-02",
  },
  {
    value: 222,
    day: "2018-05-19",
  },
  {
    value: 226,
    day: "2018-07-26",
  },
  {
    value: 277,
    day: "2018-07-06",
  },
  {
    value: 235,
    day: "2018-05-04",
  },
  {
    value: 294,
    day: "2018-06-10",
  },
  {
    value: 349,
    day: "2018-05-30",
  },
  {
    value: 366,
    day: "2018-05-06",
  },
  {
    value: 95,
    day: "2018-06-02",
  },
  {
    value: 38,
    day: "2018-05-31",
  },
  {
    value: 107,
    day: "2018-04-16",
  },
  {
    value: 211,
    day: "2018-06-11",
  },
  {
    value: 212,
    day: "2018-08-10",
  },
  {
    value: 311,
    day: "2018-08-08",
  },
  {
    value: 64,
    day: "2018-08-05",
  },
  {
    value: 214,
    day: "2018-08-04",
  },
  {
    value: 128,
    day: "2018-07-25",
  },
  {
    value: 108,
    day: "2018-04-29",
  },
  {
    value: 20,
    day: "2018-08-09",
  },
  {
    value: 46,
    day: "2018-06-07",
  },
  {
    value: 378,
    day: "2018-05-02",
  },
  {
    value: 183,
    day: "2018-04-26",
  },
  {
    value: 312,
    day: "2018-05-11",
  },
  {
    value: 110,
    day: "2018-04-01",
  },
  {
    value: 55,
    day: "2018-07-14",
  },
  {
    value: 19,
    day: "2018-07-23",
  },
  {
    value: 270,
    day: "2018-06-17",
  },
  {
    value: 109,
    day: "2018-06-23",
  },
  {
    value: 258,
    day: "2018-05-25",
  },
  {
    value: 351,
    day: "2018-07-20",
  },
  {
    value: 235,
    day: "2018-07-08",
  },
  {
    value: 321,
    day: "2018-08-03",
  },
  {
    value: 271,
    day: "2018-07-24",
  },
];
