import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom/dist/index.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routes } from "./routing/routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ContextApiProvider from "./context/index.jsx";
import { AbilityContext } from "./authorization/can.js";
import { buildAbilityFor } from "./authorization/ability.js";
import { getAuthItems } from "./utils/permission-util.js";
import { Provider } from "react-redux";
import store from "./store/index.js";

const queryClient = new QueryClient();

const ability = buildAbilityFor(getAuthItems());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter routes={routes}>
      <AbilityContext.Provider value={ability}>
        <QueryClientProvider client={queryClient}>
          <ContextApiProvider>
            <Provider store={store}>
              <App />
            </Provider>
          </ContextApiProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </AbilityContext.Provider>
    </BrowserRouter>
  </React.StrictMode>
);
