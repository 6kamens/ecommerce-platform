import React , { useState } from "react";
import routes from "./routes";
import { Switch, Route, Redirect } from "react-router-dom";
import { getAccessToken } from "../../storage/token";

function PrivateRoute(props) {

  const [login,setLogin] = useState(getAccessToken());

  let routeList = routes.guest;
  if(login) routeList = routes.member ;

  return (
    <Switch>
      {routeList.routes.map((route, idx) => {
        return (
          route.component && (
            <Route
              key={idx}
              path={route.path}
              exact={route.exact}
              name={route.name}
              render={(props) => <route.component {...props} />}
            />
          )
        );
      })}
      <Redirect to={routeList.redirect.path}></Redirect>
    </Switch>
  );
}

export default PrivateRoute;
