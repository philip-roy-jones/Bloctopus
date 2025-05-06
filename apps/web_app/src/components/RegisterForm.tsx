import { registerUser } from "@/services/authService";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser({ email, password, confirmPassword });
      console.log("Registration Successful");
      navigate(`/register/confirm?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error("Registration failed: ", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleRegister();
      }}
      noValidate={true}
    >
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
