import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import React from "react"
import { Link } from "react-router-dom";

const ForgotPasswordPage: React.FC = () => {
  return (
    <>
      <h2>Forgot Password</h2>
      <ForgotPasswordForm />
      <Link to="/login">Back to Login</Link>
    </>
  )
};

export default ForgotPasswordPage;
