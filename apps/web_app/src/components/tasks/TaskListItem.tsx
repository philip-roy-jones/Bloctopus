import React, {useState} from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditTask from "./EditTask";
import { Task } from "@/types/Task";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface TaskListItemProps {
  task: Task;
}

const TaskListItem: React.FC<TaskListItemProps> = ({ task }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  return (
    <div
      className="flex items-center gap-2 border-b pb-2 justify-between group"
    >
      <div className="flex items-center gap-2">
        <Checkbox />
        <p className="text-sm">{task.title}</p>
      </div>
      <div className="hidden group-hover:flex gap-2">
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger className="text-blue-500 hover:underline text-sm">Edit</DialogTrigger>
          <VisuallyHidden>
                  <DialogTitle></DialogTitle>
                  <DialogDescription></DialogDescription>
                </VisuallyHidden>
          <DialogContent>
            <EditTask
              task={task}
              setIsEditTaskOpen={(isOpen) => {
                setDialogOpen(isOpen);
              }}
              onClose={() => {
                setDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
        <button className="text-red-500 hover:underline text-sm">Delete</button>
      </div>
    </div>
  );
};

export default TaskListItem;
