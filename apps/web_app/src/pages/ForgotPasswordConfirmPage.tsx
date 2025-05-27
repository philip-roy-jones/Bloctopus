import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPasswordConfirmForm from "@/components/auth/ForgotPasswordConfirmForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

const ForgotPasswordConfirmPage: React.FC = () => {
  const [successfulCode, setSuccessfulCode] = useState(false);

  return (
    <div>
      <h1>Reset Your Password</h1>
      {!successfulCode ? (
      <div>
        <h2>Enter the code sent to your email</h2>
        <p>Please check your spam inbox as well</p>
        <ForgotPasswordConfirmForm setSuccessfulCode={setSuccessfulCode} />
      </div>
      ) : (
      <div>
        <h2>Reset Your Password</h2>
        <ResetPasswordForm />
      </div>
      )}
    </div>
  );
};

export default ForgotPasswordConfirmPage;