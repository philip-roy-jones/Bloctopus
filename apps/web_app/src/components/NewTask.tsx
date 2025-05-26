import React, { useState } from "react";
import { Task } from "@/types/Task";
import { createTask } from "@/services/taskService";

interface NewTaskProps {
  onTaskCreated: (task: Task) => void;
}

const NewTask: React.FC<NewTaskProps> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const createdTask = await createTask({
      title,
      description,
      });
      onTaskCreated(createdTask);
    } catch (error) {
      console.error("Failed to create task:", error);
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
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button type="submit">Create Task</button>
    </form>
  );
};

export default NewTask;
