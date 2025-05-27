import { registerUser } from "@/services/authService";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@/components/ui/Modal";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await registerUser({ email, password, confirmPassword, acceptedTerms });
      navigate(`/register/confirm?email=${encodeURIComponent(email)}`);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message || "Registration failed. Please try again.");
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  };

  return (
    <>
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
        <div>
          <label htmlFor="terms">
            <input
              type="checkbox"
              id="terms"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              required
            />{" "}
            I agree to the{" "}
            <span
              style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
              onClick={(e) => {
              e.preventDefault(); // Prevent default behavior of the link
              setIsModalOpen(true);
              }}
            >
              terms and conditions
            </span>
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h1>
          Terms and Conditions (ChatGPT Generated)
        </h1>

        <h2>1. Data is King, and You're the Kingdom</h2>
        <p>
          By using our services, you hereby acknowledge that all your data is
          now ours. We will collect, analyze, and sell every digital breadcrumb
          you drop to the highest bidder. Got a favorite cereal? We’ll make sure
          you see ads for it 27 times a day, even if you hate it by Day 2.
        </p>

        <h2>2. We’re Going to Make So Much Money</h2>
        <p>
          Not just a little bit—<strong>a lot</strong>. Enough to buy a yacht
          and name it <em>SS Thanks for the Data</em>. We might even send you a
          postcard from it, but probably not.
        </p>

        <h2>3. Privacy is a Myth</h2>
        <p>
          Much like unicorns and that gym membership you swore you’d use, your
          privacy doesn’t exist here. We’re watching, logging, and sending it
          straight to our secret lair (a.k.a. the cloud).
        </p>

        <h2>4. Selling Your Data: It’s Not Personal, It’s Just Business</h2>
        <p>
          We’re not stalking you—we’re just{" "}
          <em>strategically observing your life choices</em>. Whether it’s your
          love for late-night pizza or your questionable obsession with cat
          memes, we’re here to turn your habits into gold.
        </p>

        <h2>5. Opting Out? That’s Adorable</h2>
        <p>
          If you would like to opt out, please fill out Form 14B, available
          in-person at our headquarters in Antarctica. Bring your own sled.
        </p>

        <h2>6. Acceptance of Terms</h2>
        <p>
          By scrolling past this and clicking "I Accept," you officially agree
          to fund our future beach house in Maui. We’ll send you a postcard.
          Maybe.
        </p>

        <h2>7. Refunds and Regrets</h2>
        <p>
          There are no refunds. Only regrets. But hey, at least we’re upfront
          about it.
        </p>

        <p>
          <em>
            By continuing, you consent to us exploiting every detail of your
            online existence for profit. And if that makes us the villain,
            well…someone’s gotta do it.
          </em>
        </p>

        <p>Welcome aboard, partner!</p>
      </Modal>
    </>
  );
};

export default RegisterForm;
