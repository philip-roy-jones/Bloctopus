import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { resendVerificationCode } from "@/services/authService";
import { MultiValidationError } from "@/errors/validations";
import { toast } from "sonner";

interface RegisterConfirmFormProps {
  email: string;
  submitConfirmation: (
    email: string,
    verificationCode: string
  ) => Promise<void>;
}

const RegisterConfirmForm: React.FC<RegisterConfirmFormProps> = ({
  email,
  submitConfirmation,
}) => {
  const [code, setCode] = useState<string>("");
  const [errors, setErrors] = useState<{
    code?: string;
    all?: string;
  }>({});
  const [cooldownTime, setCooldownTime] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0; // End cooldown
          }
          return prev - 1; // Decrease countdown
        });
      }, 1000); // Update every second
    }
    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [cooldownTime]);

  const handleResendCode = async () => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const email = searchParams.get("email");
      if (!email) {
        setErrors({ all: "Email is required to resend the code." });
        return;
      }
      await resendVerificationCode(email);
      toast.success("Code resent successfully. Please check your email.");
      setCooldownTime(30);
    } catch (error) {
      setErrors({ all: "Failed to resend code. Please try again later." });
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await submitConfirmation(email, code);
  };

  return (
    <>
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Enter Verification Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">Code</Label>
              <Input
                id="email"
                type="email"
                required
                onChange={(e) => setCode(e.target.value)}
                className={
                  errors.code ? "border-red-500 focus-visible:ring-red-500" : ""
                }
              />
              {errors.code && (
                <p className="text-red-500 text-sm">{errors.code}</p>
              )}
            </div>

            <div className="space-y-2">
              <Button
                type="button"
                className={`w-full bg-gray-600 hover:bg-gray-700 ${
                  cooldownTime > 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={async () => {
                  if (cooldownTime === 0) {
                    await handleResendCode();
                  }
                }}
                disabled={cooldownTime > 0} // Disable button during cooldown
              >
                {cooldownTime > 0
                  ? `Resend Code (${cooldownTime}s)`
                  : "Resend Code"}
              </Button>
            </div>

            {errors.all && (
              <p className="text-red-500 text-sm text-center">{errors.all}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700"
            >
              Submit
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default RegisterConfirmForm;
