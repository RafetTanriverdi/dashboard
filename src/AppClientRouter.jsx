import React from "react";
import { Route } from "react-router-dom";
import { RouteWithRedirections } from "./routing/RouteWithRedirections";
import { Routes } from "react-router-dom";
import NotFound404Page from "./pages/NotFound404Page/NotFound404Page";


const AppClientRouter = ({ routes, ...props }) => {
  console.log(routes);
  const renderRoute = (el) => {
    const PageComp = React.lazy(() =>
      import( `./pages/AliasPath/${el.fileName}.jsx`)
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
      <React.Suspense fallback={<p>loading</p>}>
          <Routes>
            {routes.map(renderRoute)}
            <Route path={"*"} key={"404-page"} element={<NotFound404Page />} />
          </Routes>
      </React.Suspense>
    </>
  );
};

export default AppClientRouter;
