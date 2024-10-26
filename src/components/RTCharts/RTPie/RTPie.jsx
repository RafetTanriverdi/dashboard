import { ResponsivePie } from "@nivo/pie";
import { useThemeChangeStore } from "@rt/data/Theme/Theme";
import { ChartsDark } from "@rt/theme/DarkTheme/ChartsDarkTheme";
import { ChartsLight } from "@rt/theme/LightTheme/ChartsLightTheme";
import { useState } from "react";
import { useEffect } from "react";

const RTPie = () => {
  const { theme } = useThemeChangeStore();

  const [deviceLegend, setDeviceLegend] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setDeviceLegend({
        anchor: "bottom",
        direction: "row",
        translateY: 56,
        itemsSpacing: 2,
        itemWidth: 80,
        itemHeight: 18,
        itemTextColor: "#999",
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: "#000",
            },
          },
        ],
      });
    } else {
      setDeviceLegend({
        anchor: "right",
        direction: "column",
        justify: false,
        translateX: 84,
        translateY: 20,
        itemsSpacing: 9,
        itemWidth: 100,
        itemHeight: 22,
        itemTextColor: "#999",
        itemDirection: "left-to-right",
        itemOpacity: 1,
        symbolSize: 18,
        symbolShape: "circle",
        effects: [
          {
            on: "hover",
            style: {
              itemTextColor: theme ? "#000" : "#fff"
            },
          },
        ],
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  return (
    <ResponsivePie
      data={data}
      theme={theme ? ChartsLight : ChartsDark}
      margin={{ top: 40, right: 30, bottom: 80, left: 70 }}
      innerRadius={0.55}
      cornerRadius={1}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["opacity", 0.2]],
      }}
      enableArcLinkLabels={false}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 3]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "ruby",
          },
          id: "dots",
        },
        {
          match: {
            id: "c",
          },
          id: "dots",
        },
        {
          match: {
            id: "go",
          },
          id: "dots",
        },
        {
          match: {
            id: "python",
          },
          id: "dots",
        },
        {
          match: {
            id: "scala",
          },
          id: "lines",
        },
        {
          match: {
            id: "lisp",
          },
          id: "lines",
        },
        {
          match: {
            id: "elixir",
          },
          id: "lines",
        },
        {
          match: {
            id: "javascript",
          },
          id: "lines",
        },
      ]}
      legends={[deviceLegend]}
    />
  );
};

export default RTPie;

const data = [
  {
    id: "sass",
    label: "sass",
    value: 283,
    color: "hsl(112, 70%, 50%)",
  },
  {
    id: "rust",
    label: "rust",
    value: 326,
    color: "hsl(305, 70%, 50%)",
  },
  {
    id: "make",
    label: "make",
    value: 232,
    color: "hsl(134, 70%, 50%)",
  },
  {
    id: "javascript",
    label: "javascript",
    value: 41,
    color: "hsl(179, 70%, 50%)",
  },
  {
    id: "java",
    label: "java",
    value: 234,
    color: "hsl(201, 70%, 50%)",
  },
];
