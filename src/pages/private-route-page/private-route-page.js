import React from "react";
import { Route, Redirect } from "react-router-dom";
export const PrivateRoutePage = ({ component: Component, ...rest }) => {
  //for now
  let auth = { isAuthenticated: true };

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
