import { sendPasswordResetEmail } from "@/services/authService";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { MultiValidationError } from "@/errors/validations";

const ForgotPasswordForm: React.FC<{ setRequest200: (value: boolean) => void }> = ({ setRequest200 }) => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    all?: string;
  }>({});

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await sendPasswordResetEmail(email);
      setRequest200(true);
    } catch (error) {
      setRequest200(false);
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
            Forgot Your Password?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                className={
                  errors.email
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            {errors.all && (
              <p className="text-red-500 text-sm text-center">{errors.all}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700"
            >
              Send Password Reset Email
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

export default ForgotPasswordForm;
