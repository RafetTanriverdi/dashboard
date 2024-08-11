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
    },
    Menu: {
      itemBg: "#fefefe",
      fontSize: 16,
    },
  },
  algorithm: theme.defaultAlgorithm,
};
