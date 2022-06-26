import React, { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
  const { isAuthenticated } = useSelector((store: any) => ({
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
