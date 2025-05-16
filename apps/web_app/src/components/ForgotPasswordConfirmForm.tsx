import React, {useState} from "react"
import { confirmPasswordReset } from "@/services/authService";

interface ForgotPasswordConfirmFormProps {
  setSuccessfulCode: (value: boolean) => void;
}

const ForgotPasswordConfirmForm: React.FC<ForgotPasswordConfirmFormProps> = ({ setSuccessfulCode }) => {
  const [code, setCode] = useState("");

  const handleCodeSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await confirmPasswordReset(code);     // If code passes this point, it is valid
      setSuccessfulCode(true);
    };

  return (
    <form noValidate={true} onSubmit={handleCodeSubmit}>
      <div>
        <label htmlFor="code">Password Reset Code:</label>
        <input
          type="text"
          id="code"
          name="code"
          onChange={e => setCode(e.target.value)}
          required
        />
      </div>
      <button type="submit">Reset Password</button>
    </form>
  )
};

export default ForgotPasswordConfirmForm;
