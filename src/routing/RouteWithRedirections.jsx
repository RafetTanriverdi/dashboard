/* eslint-disable react-hooks/exhaustive-deps */
import { Navigate } from "react-router-dom";
import { ROUTES_ID } from "./routes-id";
import { getRoutePath } from "./routes";
import { useAuthStore } from "@rt/data/Auth/UseAuthStore";
import { useState, useEffect } from "react";
import LoginLayout from "@rt/layout/LoginLayout/LoginLayout";
import RTSpinner from "@rt/components/RTSpinner/RTSpinner";
import { checkUserAuthentication } from "@rt/authentication/auth-utils";
import { useLocation } from "react-router-dom";

const isOutsidePage = (path) => {
  const outsidePages = [ROUTES_ID.login, ROUTES_ID.register, ROUTES_ID.forceChangePassword];
  const outsidePaths = outsidePages.map((path) => getRoutePath(path));
  return outsidePaths.some((route) => route === path);
};

export function RouteWithRedirections({ ...props }) {
  const { isAuthenticated, setIsAuthenticated } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const location=useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const authenticated = checkUserAuthentication(); 
      setIsAuthenticated(authenticated);
      setLoading(false); 
    
    };
    fetchData();
  }, [location]);

  if (loading) {
    if (isOutsidePage(props?.routeData?.path)) {
      return <LoginLayout content={<RTSpinner />} />;
    } else {
      return <RTSpinner />;
    }
  }

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
