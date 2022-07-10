import React, { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "../../services/hooks";

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuthenticated } = useSelector((store) => ({
    isAuthenticated: store.user.isAuthenticated,
  }));

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};
