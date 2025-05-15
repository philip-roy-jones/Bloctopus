import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import PrivateRoute from "@/components/PrivateRoute";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import Register from "@/pages/RegisterPage";
import RegisterConfirmPage from "@/pages/RegisterConfirmPage";
import { BannerProvider } from "@/context/BannerContext";
import Banner from "@/components/Banner";
import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import ForgotPasswordConfirmPage from "@/pages/ForgotPasswordConfirmPage";
import PublicRoute from "@/components/PublicRoute";

const AppRouter = () => {
  return (
    <BannerProvider>
      <Router>
        <Banner />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/register/confirm"
            element={
              <PublicRoute>
                <RegisterConfirmPage />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot"
            element={
              <PublicRoute>
                <ForgotPasswordPage />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot/confirm"
            element={<ForgotPasswordConfirmPage />}
          />
          <Route
            path="*"
            element={
              <PublicRoute>
                <NotFoundPage />
              </PublicRoute>
            }
          />
        </Routes>
      </Router>
    </BannerProvider>
  );
};

export default AppRouter;
