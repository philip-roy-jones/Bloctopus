import RegisterForm from "@/components/auth/RegisterForm";
import LogoHeader from "@/components/layout/LogoHeader";
import React from "react";

const RegisterPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4">
      <LogoHeader />
      <RegisterForm />
    </div>
  )
};

export default RegisterPage;
