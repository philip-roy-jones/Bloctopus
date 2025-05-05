import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import PrivateRoute from "@/components/PrivateRoute";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import RegisterConfirm from "@/pages/RegisterConfirm";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          } 
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/register/confirm"
          element={<RegisterConfirm />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;