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
import { useAppContext } from "@/context/AppContext";
import { deleteTask } from "@/services/taskService";
import { updateTask } from "@/services/taskService";

interface TaskListItemProps {
  task: Task;
}

const TaskListItem: React.FC<TaskListItemProps> = ({ task }) => {
  const [isUpdateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { tasks, setTasks } = useAppContext();

  const handleDelete = (taskId: string) => {
    deleteTask(taskId)
      .then(() => {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
      })
      .catch((error) => {
      console.error(`Failed to delete task with ID ${taskId}:`, error);
      });
  }

  const handleCheckboxChange = async (taskId: string) => {
    await updateTask(taskId, { completed: !task.completed })
    const updatedTasks = tasks.map((t) =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
  }

  return (
    <div
      className="flex items-center gap-2 border-b pb-2 justify-between group"
    >
      <div className="flex items-center gap-2">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => handleCheckboxChange(task.id)}
        />
        <p className={`text-sm ${task.completed ? "line-through text-gray-500" : ""}`}>{task.title}</p>
      </div>
      <div className="hidden group-hover:flex gap-2">
        <Dialog open={isUpdateDialogOpen} onOpenChange={setUpdateDialogOpen}>
          <DialogTrigger className="text-blue-500 hover:underline text-sm">Edit</DialogTrigger>
          <VisuallyHidden>
                  <DialogTitle></DialogTitle>
                  <DialogDescription></DialogDescription>
                </VisuallyHidden>
          <DialogContent>
            <EditTask
              task={task}
              setIsEditTaskOpen={(isOpen) => {
                setUpdateDialogOpen(isOpen);
              }}
              onClose={() => {
                setUpdateDialogOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>

        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger className="text-red-500 hover:underline text-sm">Delete</DialogTrigger>
          <VisuallyHidden>
                  <DialogTitle></DialogTitle>
                  <DialogDescription></DialogDescription>
                </VisuallyHidden>
            <DialogContent>
            <div className="flex flex-col items-center">
              <p className="text-sm mb-4">Are you sure you want to delete this task?</p>
              <div className="flex gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => {
                // Add your delete logic here
                handleDelete(task.id);
                setDialogOpen(false);
                }}
              >
                Yes
              </button>
              <button
                className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => setDialogOpen(false)}
              >
                No
              </button>
              </div>
            </div>
            </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TaskListItem;
