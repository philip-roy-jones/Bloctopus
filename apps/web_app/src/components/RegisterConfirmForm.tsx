import React from "react";
import { confirmRegistration } from "@/services/authService";

const RegisterConfirmForm: React.FC = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const enteredCode = formData.get("verificationCode");
        console.log("Entered code:", enteredCode);
        // Add logic to handle the entered code, e.g., API call
      }}
    >
      <label htmlFor="verificationCode">Enter Verification Code:</label>
      <input
        type="text"
        id="verificationCode"
        name="verificationCode"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default RegisterConfirmForm;
