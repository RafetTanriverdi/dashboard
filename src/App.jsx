import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { routes } from "./Routes/routes";
import AppClientRouter from "./AppClientRouter";

function App() {
  return (
    <BrowserRouter>
      <>
        <AppClientRouter routes={routes} />
      </>
    </BrowserRouter>
  );
}

export default App;
