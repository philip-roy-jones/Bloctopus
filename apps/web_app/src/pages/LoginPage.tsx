import React, { useEffect, useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useBanner } from "@/context/BannerContext";

const LoginPage: React.FC = () => {
  const { setBanner } = useBanner();
  const location = useLocation();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (location.state && location.state.message) {
      setBanner(location.state.message, "info");
      // Clear the message in the history state
      const newState = { ...location.state, message: null };
      navigate(location.pathname, { replace: true, state: newState });
    }
  }, [location]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <LoginForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
      />
      <p>
        <Link to="/forgot">Forgot Password?</Link>
      </p>
      <p>
        Not Registered? <Link to="/register">Sign Up</Link>
      </p>
      <p>Helps you stay organized! Remind yourself in the future!</p>
    </div>
  );
};

export default LoginPage;
