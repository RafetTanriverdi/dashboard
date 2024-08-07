import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom/dist/index.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routes } from "./routing/routes";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ContextApiProvider from "./context/index.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter routes={routes}>
      <QueryClientProvider client={queryClient}>
        <ContextApiProvider>
          <App />
        </ContextApiProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
