import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface TermsAndConditionsProps {
  setAcceptedTerms: (accepted: boolean) => void;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ setAcceptedTerms }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleAccept = () => {
    setAcceptedTerms(true);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <span
          className="text-blue-600 underline hover:text-blue-800 cursor-pointer"
        >
          terms and conditions
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Terms and Conditions</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <h2>1. Data is King, and You're the Kingdom</h2>
          <p>
            By using our services, you hereby acknowledge that all your data is
            now ours. We will collect, analyze, and sell every digital
            breadcrumb you drop to the highest bidder. Got a favorite cereal?
            We'll make sure you see ads for it 27 times a day, even if you hate
            it by Day 2.
          </p>

          <h2>2. We're Going to Make So Much Money</h2>
          <p>
            Not just a little bit—<strong>a lot</strong>. Enough to buy a yacht
            and name it <em>SS Thanks for the Data</em>. We might even send you
            a postcard from it, but probably not.
          </p>

          <h2>3. Privacy is a Myth</h2>
          <p>
            Much like unicorns and that gym membership you swore you'd use,
            your privacy doesn't exist here. We're watching, logging, and
            sending it straight to our secret lair (a.k.a. the cloud).
          </p>

          <h2>4. Selling Your Data: It's Not Personal, It's Just Business</h2>
          <p>
            We're not stalking you—we're just{" "}
            <em>strategically observing your life choices</em>. Whether it's
            your love for late-night pizza or your questionable obsession with
            cat memes, we're here to turn your habits into gold.
          </p>

          <h2>5. Opting Out? That's Adorable</h2>
          <p>
            If you would like to opt out, please fill out Form 14B, available
            in-person at our headquarters in Antarctica. Bring your own sled.
          </p>

          <h2>6. Acceptance of Terms</h2>
          <p>
            By scrolling past this and clicking "I Accept," you officially agree
            to fund our future beach house in Maui. We'll send you a postcard.
            Maybe.
          </p>

          <h2>7. Refunds and Regrets</h2>
          <p>
            There are no refunds. Only regrets. But hey, at least we're upfront
            about it.
          </p>

          <p>
            <em>
              By continuing, you consent to us exploiting every detail of your
              online existence for profit. And if that makes us the villain,
              well…someone's gotta do it.
            </em>
          </p>

          <p>Welcome aboard, partner!</p>
        </DialogDescription>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            I Accept
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsAndConditions;