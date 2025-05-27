import React, { useState } from "react";
import EditTask from "./EditTask";
import { Task } from "@/types/Task";

interface EditTaskButtonProps {
  task: Task;
  onTaskUpdated: (updatedTask: Task) => void;
}

const EditTaskButton: React.FC<EditTaskButtonProps> = ({ task, onTaskUpdated }) => {
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);

  const handleButtonClick = () => {
    setIsEditTaskOpen((prev) => !prev);
  };

  return (
    <>
      <button onClick={handleButtonClick}>Edit</button>
      <div>
        {isEditTaskOpen && <EditTask task={task} onTaskUpdated={onTaskUpdated} setIsEditTaskOpen={setIsEditTaskOpen} />}
      </div>
    </>
  );
};

export default EditTaskButton;
