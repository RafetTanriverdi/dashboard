import "./App.css";
import AppClientRouter from "./AppClientRouter";
import { routes } from "./routes/routes";

function App() {
  return (
 
      <>
        <AppClientRouter routes={routes} />
      </>
  );
}

export default App;
