import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { RocketContext } from '../../context/rocket';

export const PrivateRoutePage = ({ component: Component, ...rest }) => {

  const [auth ] = useContext( RocketContext );

  return (
    <Route
      {...rest}
      render={(props) =>
        auth.token.length > 0 ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
