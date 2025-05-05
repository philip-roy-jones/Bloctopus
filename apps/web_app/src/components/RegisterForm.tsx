import { AUTH_SERVICE_URL } from "@/config";
import React from "react";
import { useState } from "react";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    console.log("Registering with:", { email, password, confirmPassword });

    const response = await fetch(`${AUTH_SERVICE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Registration failed:", errorData);
      alert("Registration failed. Please try again.");
      return;
    }

    console.log("Registration Successful");
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
