import React from "react"
import LoginForm from "@/components/LoginForm";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  

  return (
    <>
      <h1>Login Page</h1>
      <p>Please log in to continue.</p>
      <LoginForm />
      <p>
        Not registered?
        <Link to="/register">Create an account</Link>
      </p>
    </>
  );
};

export default Login;
