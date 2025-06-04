import React, { useEffect, useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import { useLocation, useNavigate } from "react-router-dom";
import LogoHeader from "@/components/layout/LogoHeader";

const LoginPage: React.FC = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4">
        <LogoHeader />
        <LoginForm
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
        />
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Helps you stay organized! Remind yourself in the future!
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
