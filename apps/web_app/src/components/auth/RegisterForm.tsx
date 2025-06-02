import { registerUser } from "@/services/authService";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import TermsAndConditions from "@/components/dialogs/TermsAndConditions";
import { MultiValidationError } from "@/errors/validations";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    acceptedTerms?: string;
    all?: string;
  }>({});

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await registerUser({ email, password, confirmPassword, acceptedTerms });
      navigate(`/register/confirm?email=${encodeURIComponent(email)}`);
    } catch (error: any) {
      if (error instanceof MultiValidationError) {
        // Handle validation errors
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
            Create Your Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleRegister} noValidate>
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

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Use at least 8 characters"
                required
                onChange={(e) => setPassword(e.target.value)}
                className={
                  errors.password
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Password Confirmation</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Re-enter your password"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={
                  errors.confirmPassword
                    ? "border-red-500 focus-visible:ring-red-500"
                    : ""
                }
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) => setAcceptedTerms(!!checked)}
                  required
                  className={
                    errors.acceptedTerms
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                <Label
                  htmlFor="terms"
                  className="text-sm text-gray-700 leading-snug mr-1"
                >
                  I agree to the
                </Label>
                <span className="text-sm gap-0">
                  <TermsAndConditions setAcceptedTerms={setAcceptedTerms} />
                </span>
              </div>
            </div>

            {errors.all && (
              <p className="text-red-500 text-sm text-center">{errors.all}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700"
            >
              Sign Up
            </Button>
          </form>
          <p className="mt-4 text-center text-sm">
            Have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default RegisterForm;
