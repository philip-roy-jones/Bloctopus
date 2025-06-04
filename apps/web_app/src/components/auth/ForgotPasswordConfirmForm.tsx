import React, { useState, useEffect } from "react";
import { confirmPasswordReset } from "@/services/authService";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { MultiValidationError } from "@/errors/validations";
import { sendPasswordResetEmail } from "@/services/authService";
import { toast } from "sonner"

interface ForgotPasswordConfirmFormProps {
  setSuccessfulCode: (value: boolean) => void;
}

const ForgotPasswordConfirmForm: React.FC<ForgotPasswordConfirmFormProps> = ({
  setSuccessfulCode,
}) => {
  const [code, setCode] = useState("");
  const [searchParams] = useSearchParams();
  const [errors, setErrors] = useState<{
    code?: string;
    all?: string;
  }>({});
  const [cooldownTime, setCooldownTime] = useState(0);

  useEffect(() => {
    const queryCode = searchParams.get("code");
    if (queryCode) {
      (async () => {
        try {
          await confirmPasswordReset(queryCode);
          setSuccessfulCode(true);
        } catch (error) {
          if (error instanceof MultiValidationError) {
            console.log("Validation errors:", error.errors);
            const validationErrors: { [key: string]: string } = {};
            error.errors.forEach((err) => {
              if (err.field) {
                validationErrors[err.field] = err.message;
              } else {
                validationErrors.all = err.message;
              }
            });
            setErrors(validationErrors);
          }
          console.log("Error confirming password reset:", error);
          console.error("Failed to confirm password reset:", error);
        }
      })();
    }
  }, [searchParams, setSuccessfulCode]);

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
      const email = searchParams.get("email");
      if (!email) {
        setErrors({ all: "Email is required to resend the code." });
        return;
      }
      await sendPasswordResetEmail(email);
      toast.success("Code resent successfully. Please check your email.");
      setCooldownTime(30);
    } catch (error) {
      setErrors({ all: "Failed to resend code. Please try again later." });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await confirmPasswordReset(code); // If code passes this point, it is valid
      setSuccessfulCode(true);
    } catch (error) {
      if (error instanceof MultiValidationError) {
        const validationErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.field) {
            validationErrors[err.field] = err.message;
          } else {
            validationErrors.all = err.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <>
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Enter Password Reset Code
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
                {cooldownTime > 0 ? `Resend Code (${cooldownTime}s)` : "Resend Code"}
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
          <p className="mt-4 text-center text-sm">
            <Link to="/login" className="text-blue-600 hover:underline">
              Back to Log In
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default ForgotPasswordConfirmForm;
