import React, {useState, useEffect} from "react"
import { confirmPasswordReset } from "@/services/authService";
import { useSearchParams } from "react-router-dom";

interface ForgotPasswordConfirmFormProps {
  setSuccessfulCode: (value: boolean) => void;
}

const ForgotPasswordConfirmForm: React.FC<ForgotPasswordConfirmFormProps> = ({ setSuccessfulCode }) => {
  const [code, setCode] = useState("");
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const queryCode = searchParams.get("code");
    if (queryCode) {
      (async () => {
        try {
          await confirmPasswordReset(queryCode);
          setSuccessfulCode(true);
        } catch (error) {
          console.error("Failed to confirm password reset:", error);
        }
      })();
    }
  }, [searchParams, setSuccessfulCode]);

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
