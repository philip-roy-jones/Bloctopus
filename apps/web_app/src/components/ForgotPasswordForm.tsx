import React, {useState} from "react";

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const resetCode = Math.floor(100000 + Math.random() * 900000);
    alert(`Password reset link sent to ${email}\n\n\nFOR MILESTONE 1 PURPOSES: YOUR CODE IS: ${resetCode}\n\n\nPLEASE USE THIS LINK: http:localhost:5173/reset/${resetCode}`);
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
