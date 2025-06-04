import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterConfirmForm from "@/components/auth/RegisterConfirmForm";
import { confirmRegistration } from "@/services/authService";
import { toast } from "sonner";

const RegisterConfirmPage: React.FC = () => {
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const verificationCode = queryParams.get("code");
  const email = queryParams.get("email");

  const submitConfirmation = async (
    email: string,
    verificationCode: string
  ) => {
    try {
      confirmRegistration({ email, verificationCode });
      navigate("/login");
      toast.success("Successfully verified your email! Please login.");
    } catch (error) {
      console.error("Could not confirm account: ", error);
      alert("Confirmation failed. Please try again.");
    }
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      navigate("/register");
      return;
    }

    if (email && verificationCode) {
      submitConfirmation(email, verificationCode);
    }
  }, [email, navigate, verificationCode]);

  if (!email) {
    return <p>Email is missing. Please check your registration link.</p>;
  }

  if (email && verificationCode) {
    return <p>Verifying your account...</p>;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4">
        <RegisterConfirmForm
          email={email}
          submitConfirmation={submitConfirmation}
        />
      </div>
    </>
  );
};

export default RegisterConfirmPage;
