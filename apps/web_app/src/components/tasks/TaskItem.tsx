import React from "react";
import { Task } from "@/types/Task";
import DeleteTaskButton from "./DeleteTaskButton";
import EditTaskButton from "./EditTaskButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
  onUpdate: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggle,
  onDelete,
  onUpdate,
}) => {
  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Dialog>
      <Card className="w-full">
        <DialogTrigger asChild>
          <div className="cursor-pointer">
            <CardHeader className="text-left">
              <CardTitle className="flex items-center">
                <span onClick={handleActionClick}>
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() =>
                      onToggle({ ...task, completed: !task.completed })
                    }
                    className="mr-2"
                  />
                </span>
                {task.title}
              </CardTitle>
              <CardDescription>{task.description}</CardDescription>
            </CardHeader>
            <CardContent />
          </div>
        </DialogTrigger>
        <CardFooter
          className="flex justify-between"
          onClick={handleActionClick}
        >
          <DeleteTaskButton taskId={task.id} onTaskDeleted={onDelete} />
          <EditTaskButton task={task} onTaskUpdated={onUpdate} />
        </CardFooter>
      </Card>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
          <DialogDescription>{task.description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TaskItem;
