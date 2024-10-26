import { ResponsiveLine } from "@nivo/line";
import { useThemeChangeStore } from "@rt/data/Theme/Theme";
import { ChartsDark } from "@rt/theme/DarkTheme/ChartsDarkTheme";
import { ChartsLight } from "@rt/theme/LightTheme/ChartsLightTheme";


const RTLine = () => {
  const { theme } = useThemeChangeStore();
  return (
    <ResponsiveLine
      theme={theme ? ChartsLight : ChartsDark}
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="natural"
      axisTop={null}
      axisRight={null}
      
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
        truncateTickAt: 0,
      }}
      colors={{ scheme: "red_grey" }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "color", modifiers: [] }}
      pointLabel="data.yFormatted"
      pointLabelYOffset={-12}
      enableArea={true}
      enableTouchCrosshair={true}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default RTLine;
const data = [
  {
    id: "japan",
    color: "hsl(159, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 65,
      },
      {
        x: "helicopter",
        y: 73,
      },
      {
        x: "boat",
        y: 272,
      },
      {
        x: "train",
        y: 37,
      },
      {
        x: "subway",
        y: 250,
      },
      {
        x: "bus",
        y: 138,
      },
      {
        x: "car",
        y: 212,
      },
      {
        x: "moto",
        y: 67,
      },
      {
        x: "bicycle",
        y: 180,
      },
      {
        x: "horse",
        y: 136,
      },
      {
        x: "skateboard",
        y: 33,
      },
      {
        x: "others",
        y: 151,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(324, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 109,
      },
      {
        x: "helicopter",
        y: 257,
      },
      {
        x: "boat",
        y: 158,
      },
      {
        x: "train",
        y: 16,
      },
      {
        x: "subway",
        y: 122,
      },
      {
        x: "bus",
        y: 191,
      },
      {
        x: "car",
        y: 145,
      },
      {
        x: "moto",
        y: 170,
      },
      {
        x: "bicycle",
        y: 110,
      },
      {
        x: "horse",
        y: 129,
      },
      {
        x: "skateboard",
        y: 255,
      },
      {
        x: "others",
        y: 202,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(230, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 26,
      },
      {
        x: "helicopter",
        y: 299,
      },
      {
        x: "boat",
        y: 205,
      },
      {
        x: "train",
        y: 200,
      },
      {
        x: "subway",
        y: 235,
      },
      {
        x: "bus",
        y: 199,
      },
      {
        x: "car",
        y: 151,
      },
      {
        x: "moto",
        y: 192,
      },
      {
        x: "bicycle",
        y: 51,
      },
      {
        x: "horse",
        y: 68,
      },
      {
        x: "skateboard",
        y: 139,
      },
      {
        x: "others",
        y: 214,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(337, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 227,
      },
      {
        x: "helicopter",
        y: 71,
      },
      {
        x: "boat",
        y: 147,
      },
      {
        x: "train",
        y: 142,
      },
      {
        x: "subway",
        y: 207,
      },
      {
        x: "bus",
        y: 187,
      },
      {
        x: "car",
        y: 298,
      },
      {
        x: "moto",
        y: 130,
      },
      {
        x: "bicycle",
        y: 206,
      },
      {
        x: "horse",
        y: 68,
      },
      {
        x: "skateboard",
        y: 248,
      },
      {
        x: "others",
        y: 227,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(216, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 162,
      },
      {
        x: "helicopter",
        y: 144,
      },
      {
        x: "boat",
        y: 294,
      },
      {
        x: "train",
        y: 195,
      },
      {
        x: "subway",
        y: 247,
      },
      {
        x: "bus",
        y: 73,
      },
      {
        x: "car",
        y: 124,
      },
      {
        x: "moto",
        y: 29,
      },
      {
        x: "bicycle",
        y: 137,
      },
      {
        x: "horse",
        y: 225,
      },
      {
        x: "skateboard",
        y: 153,
      },
      {
        x: "others",
        y: 74,
      },
    ],
  },
];
