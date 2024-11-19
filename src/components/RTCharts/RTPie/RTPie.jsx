/* eslint-disable react-hooks/exhaustive-deps */
import { ResponsivePie } from "@nivo/pie";
import { useDeviceStore } from "@rt/data/Device/mobile";
import { useThemeChangeStore } from "@rt/data/Theme/Theme";
import { ChartsDark } from "@rt/theme/DarkTheme/ChartsDarkTheme";
import { ChartsLight } from "@rt/theme/LightTheme/ChartsLightTheme";
import { useEffect } from "react";
import './RTPie.scss';

const RTPie = ({ fill, data, desktop, mobile }) => {
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
      margin={isMobile ? mobile.margin : desktop.margin}
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
      fill={fill}
      legends={[!isMobile ? desktop.legend : mobile.legend]}
    />
  );
};

export default RTPie;
