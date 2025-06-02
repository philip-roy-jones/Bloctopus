import React, { useEffect, useState } from "react";
import { getTasks } from "@/services/taskService";
import { Task } from "@/types/Task";
import { CalendarDay } from "@/components/tasks/CalendarDay";
import TaskList from "@/components/tasks/TaskList";

const HomePage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const changeTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const removeTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-2">
        <TaskList tasks={tasks} />
      </div>
      <div className="col-span-10">
        <CalendarDay />
      </div>
    </div>
  );
};

export default HomePage;
