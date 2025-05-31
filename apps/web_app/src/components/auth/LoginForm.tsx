import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { UnauthorizedError } from "@/errors/UnauthorizedError";

interface LoginFormProps {
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  setEmail,
  setPassword,
}) => {
  const { login } = useAuth();

  const navigate = useNavigate();

  const [errors, setErrors] = useState<{ email?: string; password?: string; all?: string; }>(
    {}
  );

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      await login({ email, password });
      navigate("/");
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrors({
          email: error.message,
          password: error.message
        })
      } else {
        setErrors({"all":"An error occured. Please try again later."});
        console.error("Login failed:", error);
      }
    }
  };

  return (
    <>
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Welcome Back!
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
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
              <Link
                to="/forgot"
                className="ml-auto block text-right text-blue-600 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>

            {errors.all && <p className="text-red-500 text-sm text-center">{errors.all}</p>}

            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700"
            >
              Log in
            </Button>
          </form>
          <p className="mt-4 text-center text-sm">
            Not Registered?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginForm;
