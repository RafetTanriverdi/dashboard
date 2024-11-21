/* eslint-disable react-hooks/exhaustive-deps */
import { ResponsiveFunnel } from "@nivo/funnel";
import { useDeviceStore } from "@rt/data/Device/mobile";
import { useThemeChangeStore } from "@rt/data/Theme/Theme";
import { ChartsDark } from "@rt/theme/DarkTheme/ChartsDarkTheme";
import { ChartsLight } from "@rt/theme/LightTheme/ChartsLightTheme";
import { useEffect } from "react";
import { Mobile } from "./data/Mobile";
import { Desktop } from "./data/Desktop";

const RTFunnel = ({data}) => {
  const { theme } = useThemeChangeStore();
  const { isMobile, handleResize } = useDeviceStore();

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return (
    <ResponsiveFunnel
      theme={theme ? ChartsLight : ChartsDark}
      data={data}
      margin={isMobile ? Mobile.margin : Desktop.margin}
      direction="vertical"
      valueFormat=">-.4s"
      colors={{ scheme: "spectral" }}
      borderWidth={20}
      labelColor={{
        from: "color",
        modifiers: [["darker", 3]],
      }}
      beforeSeparatorLength={100}
      beforeSeparatorOffset={20}
      afterSeparatorLength={100}
      afterSeparatorOffset={20}
      currentPartSizeExtension={10}
      currentBorderWidth={40}
      motionConfig="wobbly"
    />
  );
};

export default RTFunnel;

