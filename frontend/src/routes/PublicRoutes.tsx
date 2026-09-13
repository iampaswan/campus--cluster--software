


import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const PublicRoute = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
