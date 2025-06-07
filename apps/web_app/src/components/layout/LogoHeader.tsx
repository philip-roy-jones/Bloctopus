import React from "react";
import bloctopusIcon from "@/assets/images/bloctopus-icon.svg";

const LogoHeader: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center mb-4">
      <img src={bloctopusIcon} alt="Bloctopus Icon" className="h-10" />
      <p className="text-4xl font-bold ml-2">Bloctopus</p>
    </div>
  );
};

export default LogoHeader;
