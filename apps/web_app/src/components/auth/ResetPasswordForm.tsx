import React, {useState} from "react"
import { useNavigate } from "react-router-dom";
import { resetPassword } from "@/services/authService";

const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    await resetPassword(newPassword, confirmPassword);
    navigate("/login");
  };


  return (
    <form noValidate={true} onSubmit={handlePasswordSubmit}>
      <div>
        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          onChange={e => setNewPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Reset Password</button>
    </form>
  )
};

export default ResetPasswordForm;
