/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import AppClientRouter from "./AppClientRouter";
import { routes } from "./routing/routes";
import { useUserDataStore } from "./data/User/UserData";
import { useThemeChangeStore } from "./data/Theme/Theme";
import { ConfigProvider } from "antd";
import { darkTheme } from "./theme/DarkTheme/DarkTheme";
import { lightTheme } from "./theme/LightTheme/LightTheme";
import { useEffect } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import { useCookies } from "react-cookie";
import { useQueryClient } from "@tanstack/react-query";
import { Amplify } from "aws-amplify";
import awsmobile from "./aws-exports";
import {cognitoUserPoolsTokenProvider} from 'aws-amplify/auth/cognito'
import { defaultStorage } from "aws-amplify/utils";


Amplify.configure(awsmobile);

cognitoUserPoolsTokenProvider.setKeyValueStorage(defaultStorage);
function App() {
  const { theme, setTheme } = useThemeChangeStore();
  const { setUserData } = useUserDataStore();
  const [cookies, setCookie] = useCookies(["theme"]);
  const querClient = useQueryClient();
  
  useEffect(() => {
    const savedTheme = cookies.theme === "dark" ? false : true;
    setTheme(savedTheme);
    querClient.resetQueries();

    const user = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUserData(currentUser);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    user();
  }, []);

  useEffect(() => {
    setCookie("theme", theme ? "light" : "dark", { path: "/" });
  }, [theme]);

  return (
    <ConfigProvider theme={theme ? lightTheme : darkTheme}>
      <AppClientRouter routes={routes} />
    </ConfigProvider>
  );
}

export default App;
