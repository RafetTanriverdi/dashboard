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
import { Amplify } from "aws-amplify";
import awsmobile from "./aws-exports";

Amplify.configure(awsmobile);

function App() {
  const { theme, setTheme } = useThemeChangeStore();
  const { setUserData } = useUserDataStore();
  const [cookies, setCookie] = useCookies(["theme"]);
  useEffect(() => {
    const savedTheme = cookies.theme === "dark" ? false : true;
    setTheme(savedTheme);

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
    // Tema değiştiğinde çerezde güncelle
    setCookie("theme", theme ? "light" : "dark", { path: "/" });
  }, [theme]);

  return (
    <ConfigProvider theme={theme ? lightTheme : darkTheme}>
      <AppClientRouter routes={routes} />
    </ConfigProvider>
  );
}

export default App;
