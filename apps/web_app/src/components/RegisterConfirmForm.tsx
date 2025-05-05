import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { confirmRegistration } from "@/services/authService";

const RegisterConfirmForm: React.FC<{ email: string }> = ({ email }) => {
  const [verificationCode, setVerificationCode] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      confirmRegistration({ email, verificationCode });
      navigate("/login", { state: { message: "Successfully verified your email!" } });
    } catch (error) {
      console.error("Could not confirm account: ", error);
      alert("Confirmation failed. Please try again.");
    }
  };
  
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <label htmlFor="verificationCode">Enter Verification Code:</label>
      <input
        type="text"
        id="verificationCode"
        name="verificationCode"
        onChange={(e) => setVerificationCode(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default RegisterConfirmForm;
