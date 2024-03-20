import { getCurrentUser } from "aws-amplify/auth";
import "./App.css";
import AppClientRouter from "./AppClientRouter";
import { routes } from "./routing/routes";
import { UseUserDataStore } from "./data/User/UserData";
import { useEffect } from "react";
import { useThemeChangeStore } from "./data/Theme/Theme";
import { ConfigProvider } from "antd";
import { darkTheme } from "./theme/DarkTheme/DarkTheme";
import { lightTheme } from "./theme/LightTheme/LightTheme";

function App() {
  const { setUserData } = UseUserDataStore();
  const { theme } = useThemeChangeStore();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCurrentUser();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [setUserData]);

  return (
    <>
      <ConfigProvider theme={theme ? lightTheme : darkTheme}>
        <AppClientRouter routes={routes} />
      </ConfigProvider>
    </>
  );
}

export default App;
