import "./App.css";
import AppClientRouter from "./AppClientRouter";
import { routes } from "@/Routes/routes";

function App() {
  return (
 
      <>
        <AppClientRouter routes={routes} />
      </>
  );
}

export default App;
