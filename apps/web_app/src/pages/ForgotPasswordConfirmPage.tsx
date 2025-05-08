import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPasswordConfirmPage: React.FC = () => {
  const [isCodeSubmitted, setIsCodeSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Code submitted");
    setIsCodeSubmitted(true); // Switch to the new password form
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle new password submission logic here
    console.log("Password updated");
    navigate("/login"); // Redirect to login page after password reset
  };

  return (
    <div>
      <h1>Reset Your Password</h1>
      {!isCodeSubmitted ? (
        <form onSubmit={handleCodeSubmit}>
          <label htmlFor="resetCode">Enter your reset code:</label>
          <input
            type="text"
            id="resetCode"
            name="resetCode"
            required
            placeholder="Enter code"
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit}>
          <label htmlFor="newPassword">Enter your new password:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            required
            placeholder="New password"
          />
          <label htmlFor="confirmPassword">Confirm your new password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            required
            placeholder="Confirm password"
          />
          <button type="submit">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPasswordConfirmPage;