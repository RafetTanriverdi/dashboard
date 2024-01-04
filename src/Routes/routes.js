import { ROUTES_ID } from "./routes-id";
import { flatRoutes } from "./routes-util";

export const routes = [
  //public routes
  {
    id: ROUTES_ID.home,
    path: "/",
    title: "Home",
    modulePath: "HomePage/HomePage",
  },
  {
    id: ROUTES_ID.login,
    path: "/login",
    title: "Login",
    modulePath: "LoginPage/LoginPage",
  },
  {
    id: ROUTES_ID.register,
    path: "/register",
    title: "Register",
    modulePath: "RegisterPage/RegisterPage",
  },

  //private routes
  {
    id: ROUTES_ID.dashboard,
    path: "/dashboard",
    title: "Dashboard",
    modulePath: "DashboardPage/DashboardPage",
  },
];

export const FLAT_ROUTES = flatRoutes(routes);
const ROUTE_ID_MAP = {};
FLAT_ROUTES.map((el) => (ROUTE_ID_MAP[el.id] = el));

export const getRoutePath = (routeId) => {
  const routeInfo = ROUTE_ID_MAP[routeId];
  if (routeInfo) return routeInfo.path;
  else return "Undefined-Route-Path";
};

export const getRouteData = (routeId) => {
  return ROUTE_ID_MAP[routeId];
};

export const getRouteId = (routePath) => {
  const routeData = FLAT_ROUTES.find((el) => el.path === routePath);
  return routeData?.id;
};