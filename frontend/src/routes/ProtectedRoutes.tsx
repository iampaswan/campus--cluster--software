

import {
  Navigate,
  Outlet,
} from "react-router-dom";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  useEffect,
  useState,
} from "react";

import type {
  RootState,
} from "../store/store";

import {
  jwtDecode,
} from "jwt-decode";

import {
  logout,
} from "../store/authSlice";

const ProtectedRoute = () => {

  const { token } = useSelector(
    (state: RootState) => state.auth
  );

  const dispatch = useDispatch();

  const [isExpired, setIsExpired] =
    useState(false);

  useEffect(() => {

    if (!token || token === "undefined") {
      return;
    }




    try {

      const decoded: any =
        jwtDecode(token);

      const currentTime =
        Date.now() / 1000;

      if (decoded.exp < currentTime) {

        dispatch(logout());

        setIsExpired(true);

      }

    } catch (error) {

      dispatch(logout());

      setIsExpired(true);

    }


  }, [token, dispatch]);

  if (
    !token ||
    token === "undefined" ||
    isExpired
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;

};

export default ProtectedRoute;