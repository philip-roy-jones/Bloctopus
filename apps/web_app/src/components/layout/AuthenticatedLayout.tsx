import React from "react";
import {
  SidebarProvider
} from "@/components/ui/sidebar";
import SidebarLayout from "./SidebarLayout";
import { useAuth } from "@/context/AuthContext";
import MainContent from "./MainContent";

type AuthenticatedLayoutProps = {
  children: React.ReactNode;
};

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  const { logout } = useAuth();

  return (
    <SidebarProvider>
      <SidebarLayout logout={logout} />
      <MainContent>{children}</MainContent>
    </SidebarProvider>
  );
};

export default AuthenticatedLayout;
