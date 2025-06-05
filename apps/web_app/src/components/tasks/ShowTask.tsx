import React from "react";
import { Task } from "@/types/Task";

interface ShowTaskProps {
  task: Task;
}

const ShowTask: React.FC<ShowTaskProps> = ({ task }) => {
  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Start Time: {task.startTime ? new Date(task.startTime).toLocaleString() : "N/A"}</p>
      <p>End Time: {task.endTime ? new Date(task.endTime).toLocaleString() : "N/A"}</p>
      <p>Status: {task.completed ? "Completed" : "Incomplete"}</p>
    </div>
  );
};

export default ShowTask;