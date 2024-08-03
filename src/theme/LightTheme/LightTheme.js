import { theme } from "antd";

export const lightTheme = {
  token: {
    colorPrimary: "#0958D9",
    colorInfo: "#0958D9",
  },
  components: {
    Layout: {
      headerBg: "rgb(245,245,245)",
      siderBg: "rgb(245,245,245)",
      algorithm: true,
      bodyBg:'#fffff'
    },
    Menu: {
      itemBg: "rgb(245,245,245)",
    },
  },
  algorithm: theme.defaultAlgorithm,
};
