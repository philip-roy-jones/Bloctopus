import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RegisterConfirmForm from "@/components/RegisterConfirmForm";

const RegisterConfirmPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const verificationCode = queryParams.get("code");
  const email = location.state?.email; // Access the email from the state

  useEffect(() => {
    if (!email) {
      // If email is not present, redirect to the register page
      navigate("/register");
      return;
    }

    if (verificationCode) {
      // Here you would typically handle the verification logic, e.g., calling an API to verify the code
      console.log("Verification code received:", verificationCode);
      // After handling the verification, you might want to redirect or show a success message
    }

  }, [email, navigate, verificationCode]);

  if (!email) {
    return <p>Redirecting...</p>; // or a spinner/loading component
  }

  return (
    <>
      <h2>Confirm your email: {email}</h2>
      <RegisterConfirmForm />
    </>
  )
};

export default RegisterConfirmPage;
