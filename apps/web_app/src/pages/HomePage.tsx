import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    
  });

  return (
    <>
      <div>
        <h1>Task List Application</h1>
        <h2>Welcome, {user?.displayName}</h2>
        <p>Your email: {user?.email}</p>
        <p>Your role: {user?.role}</p>
        <p>This is a simple task list application.</p>
        <p>Use the navigation to explore the app.</p>
      </div>
      <div>
        <h2>Tasks</h2>
        <ul>

        </ul>
      </div>
      <div>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </>
  );
};

export default HomePage;
