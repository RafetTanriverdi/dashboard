import { Navigate } from "react-router-dom";
import { isUserLoggedIn } from "../authentication/auth-utils";
import { getRoutePath } from "./routes";
import { ROUTES_ID } from "./routes-id";

const isOutsidePage = (path) => {
  const outsidePages = [
    ROUTES_ID.login,
    ROUTES_ID.home,
    ROUTES_ID.register,
    ROUTES_ID.contact,
  ];
  const outsidePaths = outsidePages.map((path) => getRoutePath(path));
  return outsidePaths.some((route) => route === path);
};

export function RouteWithRedirections({ ...props }) {
  const isAuthenticated = isUserLoggedIn();

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
