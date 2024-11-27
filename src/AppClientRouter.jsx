import React from "react";
import { Route } from "react-router-dom";
import { RouteWithRedirections } from "./routing/RouteWithRedirections";
import { Routes } from "react-router-dom";
import NotFound404Page from "./pages/NotFound404Page/NotFound404Page";
import { ErrorBoundaryPage } from "./pages/ErrorPage/ErrorBoundaryPage";
import { lazy } from "react";

const AppClientRouter = ({ loading,routes, ...props }) => {
  const pages = import.meta.glob("./pages/**/*.jsx");
  const renderRoute = (el) => {
    const PageComp = lazy(pages[`./pages/${el.modulePath}.jsx`]);
    //404, Privacy, Support Ananymous and Login User see at the same time..
    const extendedProps = { routeData: el, ...props };
    return (
      <Route
        path={el.path}
        key={el.path}
        element={
          <RouteWithRedirections {...extendedProps}>
            <PageComp {...extendedProps} />
          </RouteWithRedirections>
        }
      >
        {el.children?.map(renderRoute)}
      </Route>
    );
  };

  return (
    <>
      <React.Suspense fallback={loading}>
        
        <ErrorBoundaryPage fallback={<p> Someting error occoured</p>}>
          <Routes>
            {routes.map(renderRoute)}
            <Route path={"*"} key={"404-page"} element={<NotFound404Page />} />
          </Routes>
        </ErrorBoundaryPage>
      </React.Suspense>
    </>
  );
};

export default AppClientRouter;
