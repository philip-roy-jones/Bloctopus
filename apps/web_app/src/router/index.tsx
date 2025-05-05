import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import PrivateRoute from "@/components/PrivateRoute";
import LoginPage from "@/pages/LoginPage";
import NotFoundPage from "@/pages/NotFoundPage";
import Register from "@/pages/RegisterPage";
import RegisterConfirmPage from "@/pages/RegisterConfirmPage";

const AppRouter = () => {
  return (
    <Router>
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
          element={<LoginPage />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/register/confirm"
          element={<RegisterConfirmPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;