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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/confirm" element={<RegisterConfirmPage />} />
          <Route path="/forgot" element={<ForgotPasswordPage />} />
          <Route path="/forgot/confirm" element={<ForgotPasswordConfirmPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </BannerProvider>
  );
};

export default AppRouter;
