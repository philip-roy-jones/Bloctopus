import { sendPasswordResetEmail } from "@/services/authService";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBanner } from "@/context/BannerContext";

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { setBanner } = useBanner();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(email);
      navigate("/forgot/confirm");
    } catch (error) {
      console.error("Failed to send password reset email:", error);
      setBanner(
        "Failed to send password reset email. Please try again.",
        "error"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate={true}>
      <div>
        <label htmlFor="email">Email Address:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ForgotPasswordForm;
