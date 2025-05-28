import React from "react"
import { deleteTask } from "@/services/taskService";

interface DeleteTaskButtonProps {
  taskId: string;
  onTaskDeleted: (taskId: string) => void;
}

const DeleteTaskButton: React.FC<DeleteTaskButtonProps> = ({ taskId, onTaskDeleted }) => {
  const handleDelete = async () => {
    try {
      await deleteTask(taskId);
      onTaskDeleted(taskId);
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  return (
    <button onClick={handleDelete} className="mr-2">
      Delete
    </button>
  );
};

export default DeleteTaskButton;
