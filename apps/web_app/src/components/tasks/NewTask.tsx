import React, { useState, useEffect, use } from "react";
import { Task, CreateTask } from "@/types/Task";
import { createTask } from "@/services/taskService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useAppContext } from "@/context/AppContext";
import { getRandomSuggestion } from "@/services/suggestionService";

const NewTask: React.FC<{ onClose: () => void; closeOnCreate?: boolean }> = ({
  onClose,
  closeOnCreate = false,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { setTasks } = useAppContext();

  useEffect(() => {
    fetchSuggestion();
  }, []);

  const fetchSuggestion = async () => {
      try {
        const suggestion = await getRandomSuggestion();
        if (suggestion) {
          const inputElement = document.getElementById("title") as HTMLInputElement;
          if (inputElement) {
            inputElement.placeholder = suggestion;
          }
        }
      } catch (error) {
        console.error("Failed to fetch suggestion:", error);
      }
    };

  const onTaskCreated = (task: Task) => {
    setTasks((prevTasks: Task[]) => [...prevTasks, task]);
    if (closeOnCreate) {
      onClose();
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const taskData: CreateTask = { title, description };
      if (startTime) taskData.startTime = startTime;
      if (endTime) taskData.endTime = endTime;

      const createdTask = await createTask(taskData);
      onTaskCreated(createdTask);
      setTitle("");
      setDescription("");
      setStartTime("");
      setEndTime("");
      (event.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);

    if (value === "") {
      fetchSuggestion();
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
          onChange={handleTitleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex space-x-4 items-center">
        <div className="flex flex-col">
          <Label htmlFor="startTime">Start Time</Label>
          <Input
        id="startTime"
        type="datetime-local"
        onChange={(e) => setStartTime(new Date(e.target.value).toISOString())}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="endTime">End Time</Label>
          <Input
        id="endTime"
        type="datetime-local"
        onChange={(e) => setEndTime(new Date(e.target.value).toISOString())}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="w-25 mr-4" type="button" variant={"outline"} onClick={onClose}>
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
