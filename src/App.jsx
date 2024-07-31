/* eslint-disable react-hooks/exhaustive-deps */


import "./App.css";
import AppClientRouter from "./AppClientRouter";
import { routes } from "./routing/routes";
import { useUserDataStore } from "./data/User/UserData";

import { useThemeChangeStore } from "./data/Theme/Theme";
import { ConfigProvider } from "antd";
import { darkTheme } from "./theme/DarkTheme/DarkTheme";
import { lightTheme } from "./theme/LightTheme/LightTheme";
import themes from "devextreme/ui/themes";
import { useEffect } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { useCookies } from "react-cookie";

function App() {
  const { theme, setTheme } = useThemeChangeStore();
  const { setUserData } = useUserDataStore();


  const [cookies, setCookie] = useCookies(["light-theme"]);

 


  

  useEffect(() => {
    const isLightTheme = cookies["light-theme"] === "true";
    setTheme(isLightTheme ?true : false); // Varsayılan olarak 'true' (light theme) yapıyoruz
  themes.current(theme?"generic.light":"generic.dark");
    const user = async () =>
      await getCurrentUser()
        .then((user) => {
          setUserData(user);
        })
        .catch((err) => {
          console.log("err", err);
        });
    user();
  
    setCookie("light-theme", theme);
  }, [cookies, setTheme, setUserData, setCookie]);
  

  console.log("theme", theme);
  return (
    <>
      <ConfigProvider theme={theme ? lightTheme : darkTheme}>
        <AppClientRouter routes={routes} />
      </ConfigProvider>
    </>
  );
}

export default App;
