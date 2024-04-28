//import { getCurrentUser } from "aws-amplify/auth";

import "./App.css";
import AppClientRouter from "./AppClientRouter";
import { routes } from "./routing/routes";
// import { useUserDataStore } from "./data/User/UserData";
// import { useEffect } from "react";
import { useThemeChangeStore } from "./data/Theme/Theme";
import { ConfigProvider } from "antd";
import { darkTheme } from "./theme/DarkTheme/DarkTheme";
import { lightTheme } from "./theme/LightTheme/LightTheme";
import themes from "devextreme/ui/themes";

function App() {
  const { theme } = useThemeChangeStore();

  themes.current("generic.dark");

  return (
    <>
      <ConfigProvider theme={theme ? lightTheme : darkTheme}>
        <AppClientRouter routes={routes} />
      </ConfigProvider>
    </>
  );
}

export default App;
