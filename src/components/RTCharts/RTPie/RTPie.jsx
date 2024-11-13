/* eslint-disable react-hooks/exhaustive-deps */
import { ResponsivePie } from "@nivo/pie";
import { useDeviceStore } from "@rt/data/Device/mobile";
import { useThemeChangeStore } from "@rt/data/Theme/Theme";
import { ChartsDark } from "@rt/theme/DarkTheme/ChartsDarkTheme";
import { ChartsLight } from "@rt/theme/LightTheme/ChartsLightTheme";
import { useEffect } from "react";
import { Desktop } from "./data/Desktop";
import { Mobile } from "./data/Mobile";

const RTPie = () => {
  const { theme } = useThemeChangeStore();
  const { isMobile, handleResize } = useDeviceStore();

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return (
    <ResponsivePie
      data={data}
      theme={theme ? ChartsLight : ChartsDark}
      margin={isMobile ? Mobile.margin : Desktop.margin}
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
      legends={[!isMobile ? Desktop.legend : Mobile.legend]}
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
