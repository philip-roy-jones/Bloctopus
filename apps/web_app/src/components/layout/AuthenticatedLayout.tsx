import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarLayout from "./SidebarLayout";
import MainContent from "./MainContent";
import { AppProvider } from "@/context/AppContext";

type AuthenticatedLayoutProps = {
  children: React.ReactNode;
};

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}) => {
  return (
    <AppProvider>
      <SidebarProvider>
        <SidebarLayout />
        <MainContent>{children}</MainContent>
      </SidebarProvider>
    </AppProvider>
  );
};

export default AuthenticatedLayout;
