import React from "react";
import { Navigate, Route } from "react-router-dom";
import auth from "../../services/authService";

const ProtectedRoute = ({ path, element: Component, render, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser()) return <Navigate to="/login" />;
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
