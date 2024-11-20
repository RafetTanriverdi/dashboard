import { ResponsiveLine } from "@nivo/line";
import { useDeviceStore } from "@rt/data/Device/mobile";
import { useThemeChangeStore } from "@rt/data/Theme/Theme";
import { ChartsDark } from "@rt/theme/DarkTheme/ChartsDarkTheme";
import { ChartsLight } from "@rt/theme/LightTheme/ChartsLightTheme";
import { useEffect } from "react";
import { Desktop } from "./data/Desktop";
import { Mobile } from "./data/Mobile";

const RTLine = ({data}) => {
  const { theme } = useThemeChangeStore();
  const { isMobile, handleResize } = useDeviceStore();

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);


  return (
    <ResponsiveLine
      theme={theme ? ChartsLight : ChartsDark}
      data={data}
      margin={isMobile ? Mobile.margin : Desktop.margin}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "0",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      curve="basis"
 
      axisBottom={{
        tickSize: 15,
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
      enableSlices='x'
      pointLabelYOffset={-12}
      enableArea={true}
      enableTouchCrosshair={true}
      useMesh={true}
      legends={[isMobile ? Mobile.legend : Desktop.legend]}
    />
  );
};

export default RTLine;
