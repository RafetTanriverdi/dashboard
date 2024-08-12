/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate } from "react-router-dom";
import { ROUTES_ID } from "./routes-id";
import { getRoutePath } from "./routes";
import { checkUserAuthentication } from "@rt/authentication/auth-utils";
import { useWebSocketConnection } from "@rt/authentication/WebSocketsConnections";

const isOutsidePage = (path) => {
  const outsidePages = [
    ROUTES_ID.login,
    ROUTES_ID.register,
    ROUTES_ID.forceChangePassword,
  ];
  const outsidePaths = outsidePages.map((path) => getRoutePath(path));
  return outsidePaths.some((route) => route === path);
};

export function RouteWithRedirections({ ...props }) {
  const isAuthenticated = checkUserAuthentication();
  useWebSocketConnection();

  if (isAuthenticated) {
    if (isOutsidePage(props?.routeData?.path)) {
      return <Navigate to={getRoutePath(ROUTES_ID.dashboard)} />;
    } else {
      return <>{props.children}</>;
    }
  } else {
    if (isOutsidePage(props?.routeData?.path)) {
      return <>{props.children}</>;
    } else {
      return <Navigate to={getRoutePath(ROUTES_ID.login)} />;
    }
  }
}
