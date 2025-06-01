import React from "react";
import taskifyIcon from "@/assets/images/taskify-icon.svg";

const LogoHeader: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center mb-4">
      <img src={taskifyIcon} alt="Taskify Icon" className="h-10" />
      <p className="text-4xl font-bold ml-2">Taskify</p>
    </div>
  );
};

export default LogoHeader;
