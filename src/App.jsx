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
import awsExports from "./aws-exports";
import { Amplify } from "aws-amplify";
Amplify.configure(awsExports);



function App() {
  const { theme, setTheme } = useThemeChangeStore();
  const { setUserData } = useUserDataStore();
  const [cookies, setCookie] = useCookies(["theme"]);
console.log('awsExports',awsExports)
  useEffect(() => {
    // Uygulama başlarken çerezden tema değerini al ve uygula
    const savedTheme = cookies.theme === "dark" ? false : true;
    setTheme(savedTheme);

    const user = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUserData(currentUser);
        console.log("User data fetched:", currentUser);
      } catch (err) {
        console.log("Error fetching user data:", err);
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
