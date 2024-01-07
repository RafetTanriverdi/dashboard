import React from "react";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { RouteWithRedirections } from "./Routes/RouteWithRedirections";
import { ErrorBoundaryPage } from "./Pages/ErrorPage/ErrorBoundaryPage";
import { RTLoading } from "./Components/RTLoading";
import NotFound404Page from "./Pages/NotFound404Page/NotFound404Page";

const AppClientRouter = ({ routes, ...props }) => {
  console.log(routes);
  const renderRoute = (el) => {
    const PageComp = React.lazy(() =>
      import(/* @vite-ignore */ `./Pages/${el.modulePath}`)
    );

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
      <React.Suspense fallback={<RTLoading.page />}>
        <ErrorBoundaryPage fallback={<p>Page Rendering Exception</p>}>
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
