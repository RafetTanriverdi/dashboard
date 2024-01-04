/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { Skeleton } from "antd";
import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { RouteWithRedirections } from "./Routes/RouteWithRedirections";
import { ErrorBoundaryPage } from "./Pages/ErrorPage/ErrorBoundaryPage";

// eslint-disable-next-line react/prop-types
const AppClientRouter = ({  routes,...props }) => {
  console.log(routes);
  const renderRoute = (el) => {
const PageComp = React.lazy(() => import(/* @vite-ignore */ `./Pages/${el.modulePath}`));


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
      <React.Suspense fallback={<Skeleton active />}>
      <ErrorBoundaryPage fallback={<p>Page Rendering Exception</p>}>

        <Routes>
          {routes.map(renderRoute)}
          <Route path={"*"} key={"404-page"} />
        </Routes>
      </ErrorBoundaryPage>
      </React.Suspense>
    </>
  );
};

export default AppClientRouter;
