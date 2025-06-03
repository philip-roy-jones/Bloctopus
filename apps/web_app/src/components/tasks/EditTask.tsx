import React, { useState, useEffect } from "react";
import { Task } from "@/types/Task";
import { updateTask } from "@/services/taskService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/context/AppContext";

interface EditTaskProps {
  task: Task;
  setIsEditTaskOpen: (isOpen: boolean) => void;
  onClose: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({ task, setIsEditTaskOpen, onClose }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const { tasks, setTasks } = useAppContext();

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
  }, [task]);

  const onTaskUpdated = (updatedTask: Task) => {
    const updatedTasks = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    setTasks(updatedTasks);
    setIsEditTaskOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const updatedTask = await updateTask(task.id, {
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
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-w-xl w-full"
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Optional task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <Button className="w-25 mr-4" variant={"outline"} onClick={onClose}>
          <span className="text-sm">Cancel</span>
        </Button>

        <Button type="submit" className="w-25">
          Update Task
        </Button>
      </div>
    </form>
  );
};

export default EditTask;
