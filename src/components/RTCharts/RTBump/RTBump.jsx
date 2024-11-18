import { ResponsiveBump } from '@nivo/bump'
import { useThemeChangeStore } from '@rt/data/Theme/Theme';
import { ChartsDark } from '@rt/theme/DarkTheme/ChartsDarkTheme';
import { ChartsLight } from '@rt/theme/LightTheme/ChartsLightTheme';

const RTBump = () => {
    const { theme } = useThemeChangeStore();
  return (
    <ResponsiveBump
    theme={theme ? ChartsLight : ChartsDark}
      data={data}
      colors={{ scheme: "spectral" }}
      lineWidth={3}
      activeLineWidth={6}
      inactiveLineWidth={3}
      inactiveOpacity={0.15}
      pointSize={9}
      activePointSize={16}
      inactivePointSize={0}
      pointColor={{ theme: "background" }}
      pointBorderWidth={3}
      activePointBorderWidth={3}
      pointBorderColor={{ from: "serie.color" }}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: -36,
        truncateTickAt: 0,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Ranking",
        legendPosition: "middle",
        legendOffset: -40,
        truncateTickAt: 0,
      }}
      margin={{ top: 40, right: 90, bottom: 40, left: 60 }}
      axisRight={null}
    />
  );
};

export default RTBump;

const data = [
  {
    id: "Serie 1",
    data: [
      {
        x: "July",
        y: 1,
      },
      {
        x: "August",
        y: 2,
      },
      {
        x: "September",
        y: 9,
      },
      {
        x: "October",
        y: 9,
      },
      {
        x: "November",
        y: 9,
      },
    ],
  },
  {
    id: "Serie 2",
    data: [
      {
        x: "July",
        y: 2,
      },
      {
        x: "August",
        y: 8,
      },
      {
        x: "September",
        y: 7,
      },
      {
        x: "October",
        y: 2,
      },
      {
        x: "November",
        y: 9,
      },
    ],
  },
  {
    id: "Serie 3",
    data: [
      {
        x: "July",
        y: 9,
      },
      {
        x: "August",
        y: 9,
      },
      {
        x: "September",
        y: 9,
      },
      {
        x: "October",
        y: 5,
      },
      {
        x: "November",
        y: 5,
      },
    ],
  },
  {
    id: "Serie 4",
    data: [
      {
        x: "July",
        y: 9,
      },
      {
        x: "August",
        y: 1,
      },
      {
        x: "September",
        y: 9,
      },
      {
        x: "October",
        y: 9,
      },
      {
        x: "November",
        y: 6,
      },
    ],
  },
  {
    id: "Serie 5",
    data: [
      {
        x: "July",
        y: 9,
      },
      {
        x: "August",
        y: 9,
      },
      {
        x: "September",
        y: 9,
      },
      {
        x: "October",
        y: 3,
      },
      {
        x: "November",
        y: 2,
      },
    ],
  },
  {
    id: "Serie 6",
    data: [
      {
        x: "July",
        y: 3,
      },
      {
        x: "August",
        y: 3,
      },
      {
        x: "September",
        y: 2,
      },
      {
        x: "October",
        y: 4,
      },
      {
        x: "November",
        y: 3,
      },
    ],
  },
  {
    id: "Serie 7",
    data: [
      {
        x: "July",
        y: 6,
      },
      {
        x: "August",
        y: 9,
      },
      {
        x: "September",
        y: 8,
      },
      {
        x: "October",
        y: 7,
      },
      {
        x: "November",
        y: 9,
      },
    ],
  },
  {
    id: "Serie 8",
    data: [
      {
        x: "July",
        y: 9,
      },
      {
        x: "August",
        y: 6,
      },
      {
        x: "September",
        y: 5,
      },
      {
        x: "October",
        y: 9,
      },
      {
        x: "November",
        y: 9,
      },
    ],
  },
  {
    id: "Serie 9",
    data: [
      {
        x: "July",
        y: 5,
      },
      {
        x: "August",
        y: 7,
      },
      {
        x: "September",
        y: 4,
      },
      {
        x: "October",
        y: 9,
      },
      {
        x: "November",
        y: 4,
      },
    ],
  },

];
