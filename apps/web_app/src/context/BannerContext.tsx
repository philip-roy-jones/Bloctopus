import React, { createContext, useContext, useState } from "react";

type BannerContextType = {
  message: string | null;
  type: "error" | "info" | null;
  setBanner: (message: string, type: "error" | "info") => void;
  clearBanner: () => void;
};

const BannerContext = createContext<BannerContextType | undefined>(undefined);

export const BannerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<"error" | "info" | null>(null);

  const setBanner = (message: string, type: "error" | "info") => {
    setMessage(message);
    setType(type);
  };

  const clearBanner = () => {
    setMessage(null);
    setType(null);
  };

  return (
    <BannerContext.Provider value={{ message, type, setBanner, clearBanner }}>
      {children}
    </BannerContext.Provider>
  );
};

export const useBanner = () => {
  const context = useContext(BannerContext);
  if (!context) {
    throw new Error("useBanner must be used within a BannerProvider");
  }
  return context;
};