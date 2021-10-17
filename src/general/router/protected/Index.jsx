import React from "react";
import { Route, Redirect } from "react-router-dom";
import Auth from "./Auth";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const reduxState = useSelector(state => state);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (Auth.isAuthenticated() || Object.keys(reduxState.access_token).length) {
          return <Component {...props} />;
        } else {
          
          return (
            <Redirect
              to={{
                pathname: "/signin",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};