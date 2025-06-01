import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import NewTask from "./NewTask";

const NewTaskDialog: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger>Add a Task</DialogTrigger>
      <DialogContent>
        <NewTask />
      </DialogContent>
    </Dialog>
  );
};

export default NewTaskDialog;
