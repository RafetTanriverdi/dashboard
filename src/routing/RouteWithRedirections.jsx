import { Navigate } from "react-router-dom";
import { ROUTES_ID } from "./routes-id";
import { getRoutePath } from "./routes";
import { useAuthStore } from "@rt/data/Auth/UseAuthStore";
import { useEffect } from "react";
import { fetchAuthSession } from "aws-amplify/auth";

const isOutsidePage = (path) => {
  const outsidePages = [ROUTES_ID.login, ROUTES_ID.register];
  const outsidePaths = outsidePages.map((path) => getRoutePath(path));
  return outsidePaths.some((route) => route === path);
};

export function RouteWithRedirections({ ...props }) {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await fetchAuthSession();
        const accessToken = session.tokens?.accessToken?.toString() || null;
        setIsAuthenticated(!!accessToken);
        console.log("accessToken", accessToken);
      } catch (error) {
        console.error("Error fetching access token:", error);
        setIsAuthenticated(false);
      }
    };

    fetchData();
  }, [setIsAuthenticated]);

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
