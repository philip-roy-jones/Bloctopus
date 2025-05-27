import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getTasks } from "@/services/taskService";
import NewTask from "@/components/tasks/NewTask";
import { Task } from "@/types/Task";
import DeleteTaskButton from "@/components/tasks/DeleteTaskButton";
import EditTaskButton from "@/components/tasks/EditTaskButton";

const HomePage: React.FC = () => {
  const { logout, user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    navigate("/login");
  };

  const addTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const changeTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
  }

  const removeTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  }, []);

  return (
    <>
      <div>
        <h1>Task List Application</h1>
        <h2>Welcome, {user?.displayName}</h2>
        <p>Your email: {user?.email}</p>
        <p>Your role: {user?.role}</p>
        <p>This is a simple task list application.</p>
        <p>Use the navigation to explore the app.</p>
      </div>
      <div>
        <h2>Tasks</h2>
        <NewTask onTaskCreated={addTask}/>
        <ul>
            {tasks && tasks.map((task) => (
            <li key={task.id}>
              <input type="checkbox" disabled checked={task.completed} />
              {task.title} - 
              {task.description} - 
              {<DeleteTaskButton taskId={task.id} onTaskDeleted={removeTask}/>} - 
              {<EditTaskButton task={task} onTaskUpdated={changeTask}/>}
            </li>
            ))}
        </ul>
      </div>
      <div>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </>
  );
};

export default HomePage;
