import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "@/services/authService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { MultiValidationError } from "@/errors/validations";
import { toast } from "sonner";

const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
    all?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await resetPassword(password, confirmPassword);
      navigate("/login");
      toast.success("Password reset successfully. You can now log in.");
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
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
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

            {errors.all && (
              <p className="text-red-500 text-sm text-center">{errors.all}</p>
            )}

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700"
            >
              Reset Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default ResetPasswordForm;
