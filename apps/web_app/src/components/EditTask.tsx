import React, { useState, useEffect } from "react";
import { Task } from "@/types/Task";
import { updateTask } from "@/services/taskService";

interface EditTaskProps {
  task: Task;
  onTaskUpdated: (updatedTask: Task) => void;
  setIsEditTaskOpen: (isOpen: boolean) => void;
}

const EditTask: React.FC<EditTaskProps> = ({task, onTaskUpdated, setIsEditTaskOpen }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
  }, [task]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const updatedTask = await updateTask(task.id, {
        ...task,
        title,
        description,
      });
      onTaskUpdated(updatedTask);
      setIsEditTaskOpen(false);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">Update Task</button>
    </form>
  );
};

export default EditTask;
