import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import NewTask from "../tasks/NewTask";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const SidebarLayout: React.FC<{ logout: () => void }> = ({ logout }) => {
  const { state } = useSidebar();
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {state === "collapsed" && (
        <div className="fixed top-2 left-4 z-50">
          <SidebarTrigger />
        </div>
      )}

      <Sidebar collapsible="offcanvas">
        <SidebarHeader>
          <div className="flex items-center justify-between w-full pr-2">
            <div className="flex items-center gap-2">
              <img
                src="/src/assets/images/taskify-icon.svg"
                alt="Taskify"
                className="h-8 w-8"
              />
              <h1 className="text-lg font-bold">Taskify</h1>
            </div>
            {state === "expanded" && <SidebarTrigger />}
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={() => setDialogOpen(true)}>
                Add a Task
              </SidebarMenuButton>
              <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <VisuallyHidden>
                  <DialogTitle></DialogTitle>
                  <DialogDescription></DialogDescription>
                </VisuallyHidden>
                <DialogContent>
                  <NewTask />
                </DialogContent>
              </Dialog>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/tasks">Tasks</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to="/planner">Planner</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton onClick={logout}>Logout</SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </div>
  );
};

export default SidebarLayout;
