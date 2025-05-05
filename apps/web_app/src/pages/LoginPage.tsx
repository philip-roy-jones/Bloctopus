import React from "react"
import LoginForm from "@/components/LoginForm";
import { Link } from "react-router-dom";

const LoginPage: React.FC = () => {
  

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
