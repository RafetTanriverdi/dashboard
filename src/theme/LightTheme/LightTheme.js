import { theme } from "antd";

export const lightTheme = {
  token: {
    colorPrimary: "#0958D9",
    colorInfo: "#0958D9",
  },
  components: {
    Layout: {
      headerBg: "#fefefe",
      siderBg: "#fefefe",
      algorithm: true,
      headerHeight: 76,
      
      triggerBg: "#e3e3e3",
      triggerColor: "#000000",
    },
    Menu: {
      itemBg: "#fefefe",
      fontSize: 16,
    },
  },
  algorithm: theme.defaultAlgorithm,
};
