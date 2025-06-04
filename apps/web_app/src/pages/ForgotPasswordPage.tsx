import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import LogoHeader from "@/components/layout/LogoHeader";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

const ForgotPasswordPage: React.FC = () => {
  const [request200, setRequest200] = useState(false);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-100 p-4">
      <LogoHeader />
      {request200 ? (
        <Card className="">
          <CardContent className="flex flex-col justify-center items-center">
            <p className="text-center text-lg font-semibold mb-4">
              If we found an account with that email, you'll receive a password reset link shortly.
            </p>
            <Button asChild className="bg-red-500 text-white hover:bg-red-600">
              <Link to="/login">Back to Login</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <ForgotPasswordForm setRequest200={setRequest200} />
      )}
    </div>
  );
};

export default ForgotPasswordPage;
