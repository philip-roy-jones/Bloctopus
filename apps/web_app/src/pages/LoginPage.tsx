import React, { useEffect } from "react"
import LoginForm from "@/components/LoginForm";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useBanner } from "@/context/BannerContext";

const LoginPage: React.FC = () => {
  const { setBanner } = useBanner();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.message) {
      setBanner(location.state.message, "info");
      // Clear the message in the history state
      const newState = { ...location.state, message: null };
      navigate(location.pathname, { replace: true, state: newState });
    }
  }, [location]);

  return (
    <>
      <h1>Login</h1>
      <LoginForm />
      <p>
        Not registered?
        <Link to="/register">Create an account</Link>
      </p>
    </>
  );
};

export default LoginPage;
