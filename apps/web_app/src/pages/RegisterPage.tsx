import RegisterForm from "@/components/RegisterForm";
import React from "react";
import { Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  return (
    <>
      <h1>Register</h1>
      <RegisterForm />
      <p>
        Already have an account?
        <Link to="/login">Log In</Link>
      </p>
    </>
  )
};

export default RegisterPage;
