import React, {useState} from "react";

interface RegisterConfirmFormProps {
  email: string;
  submitConfirmation: (email: string, verificationCode: string) => Promise<void>;
}

const RegisterConfirmForm: React.FC<RegisterConfirmFormProps> = ({ email, submitConfirmation }) => {
  const [verificationCode, setVerificationCode] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await submitConfirmation(email, verificationCode);
  };
  
  return (
    <form onSubmit={handleSubmit}>
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
