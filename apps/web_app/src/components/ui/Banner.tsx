import React from "react";
import { useBanner } from "@/context/BannerContext";

const Banner: React.FC = () => {
  const { message, type, clearBanner } = useBanner();

  if (!message) return null;

  return (
    <div
      style={{
        padding: "10px",
        backgroundColor: type === "error" ? "red" : "blue",
        color: "white",
        textAlign: "center",
      }}
    >
      {message}
      <button
        onClick={clearBanner}
        style={{
          marginLeft: "10px",
          backgroundColor: "white",
          color: type === "error" ? "red" : "blue",
          border: "none",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  );
};

export default Banner;