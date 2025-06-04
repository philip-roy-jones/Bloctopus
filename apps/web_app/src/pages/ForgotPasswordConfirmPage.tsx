import React, { useState } from "react";
import ForgotPasswordConfirmForm from "@/components/auth/ForgotPasswordConfirmForm";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import LogoHeader from "@/components/layout/LogoHeader";

const ForgotPasswordConfirmPage: React.FC = () => {
  const [successfulCode, setSuccessfulCode] = useState(false);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4">
      <LogoHeader />
      {!successfulCode ? (
        <ForgotPasswordConfirmForm setSuccessfulCode={setSuccessfulCode} />
      ) : (
        <ResetPasswordForm />
      )}
    </div>
  );
};

export default ForgotPasswordConfirmPage;
