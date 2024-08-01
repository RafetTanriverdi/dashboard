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

function App() {
  const { theme } = useThemeChangeStore();
  const { setUserData } = useUserDataStore();

  useEffect(() => {
    const user = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUserData(currentUser);
      } catch (err) {
        console.log("Error fetching user data:", err);
      }
    };
    user();
  }, []);

  return (
    <ConfigProvider theme={theme ? lightTheme : darkTheme}>
      <AppClientRouter routes={routes} />
    </ConfigProvider>
  );
}

export default App;
