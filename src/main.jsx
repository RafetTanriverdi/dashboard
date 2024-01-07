import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom/dist/index.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routes } from "./Routes/routes.js";
import { jwtDecode } from "jwt-decode";

const queryClient = new QueryClient();
const token = localStorage.getItem("accessToken");
const decoded = jwtDecode(token);
console.log(decoded);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter routes={routes}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
