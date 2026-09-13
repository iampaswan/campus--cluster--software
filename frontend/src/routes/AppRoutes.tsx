import PublicRoute from "./PublicRoutes";
import ProtectedRoute from "./ProtectedRoutes";

import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/main.layout/MainLayout";
import Dashboard from "../pages/dashboard.pages/Dashboard";
import LandingPage from "../components/authentication/landingPage";
import AuthPage from "../components/authentication/authPage";
import OAuthSuccess from "../components/pages/Oauth";
import Users from "../pages/auth.pages/users.page";

export default function AppRoutes() {
  return (
    <Routes>

      < Route path="/" element={<LandingPage />} />

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Route>

      <Route path="/oauth-success" element={<OAuthSuccess />} />
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
}