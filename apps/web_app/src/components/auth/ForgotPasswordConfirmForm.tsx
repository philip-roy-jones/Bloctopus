import React, { useState, useEffect } from "react";
import { confirmPasswordReset } from "@/services/authService";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { MultiValidationError } from "@/errors/validations";

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
                className="w-full bg-gray-600 hover:bg-gray-700"
                onClick={async () => {
                  alert("To be implemented: Resend code functionality");
                }}
              >
                Resend Code
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
