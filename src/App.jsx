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

function App() {
  const { theme, setTheme } = useThemeChangeStore();
  const { setUserData } = useUserDataStore();
  const [cookies, setCookie] = useCookies(["light-theme"]);

  useEffect(() => {
    const isLightTheme = cookies["light-theme"] === "true";
    setTheme(isLightTheme !== undefined ? isLightTheme : true);
    const user = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUserData(currentUser);
      } catch (err) {
        console.log("Error fetching user data:", err);
      }
    };
    user();

    setCookie("light-theme", theme);
  }, [cookies, setTheme, setUserData, setCookie, theme]);

  return (
    <ConfigProvider theme={theme ? lightTheme : darkTheme}>
      <AppClientRouter routes={routes} />
    </ConfigProvider>
  );
}

export default App;
