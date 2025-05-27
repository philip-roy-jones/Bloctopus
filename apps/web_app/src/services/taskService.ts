import { Task, UpdateTask } from "../types/Task";
import { CreateTask } from "@/types/Task";

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(`/api/tasks/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch tasks");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch tasks request failed:", error);
    throw error;
  }
}

export const createTask = async (task: CreateTask) => {
  try {
    const response = await fetch(`/api/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create task");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Create task request failed:", error);
    throw error;
  }
};

export const updateTask = async (taskId: string, task: UpdateTask) => {
  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to update task");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Update task request failed:", error);
    throw error;
  }
}

export const deleteTask = async (taskId: string) => {
  try {
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to delete task");
    }

    console.log("Task deleted successfully");
  } catch (error) {
    console.error("Delete task request failed:", error);
    throw error;
  }
};