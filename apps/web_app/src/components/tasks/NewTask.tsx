import React, { useState } from "react";
import { Task } from "@/types/Task";
import { createTask } from "@/services/taskService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/context/AppContext";

const NewTask: React.FC<{ onClose: () => void; closeOnCreate?: boolean }> = ({
  onClose,
  closeOnCreate = false,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { setTasks } = useAppContext();

  const onTaskCreated = (task: Task) => {
    setTasks((prevTasks: Task[]) => [...prevTasks, task]);
    if (closeOnCreate) {
      onClose();
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const createdTask = await createTask({
        title,
        description,
      });
      onTaskCreated(createdTask);
      setTitle("");
      setDescription("");
      (event.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Failed to create task:", error);
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
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Optional task description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <Button className="w-25 mr-4" variant={"outline"} onClick={onClose}>
          <span className="text-sm">Cancel</span>
        </Button>

        <Button type="submit" className="w-25">
          Create Task
        </Button>
      </div>
    </form>
  );
};

export default NewTask;
