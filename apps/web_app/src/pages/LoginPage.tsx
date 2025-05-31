import React, { useEffect, useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import { useLocation, useNavigate } from "react-router-dom";
import { useBanner } from "@/context/BannerContext";
import taskifyIcon from "@/assets/images/taskify-icon.svg";

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
    <>
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4">
        <div className="w-full flex items-center justify-center mb-4">
          <img src={taskifyIcon} alt="Taskify Icon" className="h-10" />
          <p className="text-4xl font-bold ml-2">Taskify</p>
        </div>
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
