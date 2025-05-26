import { Task } from "../types/Task";

export const getTasks = async (): Promise<Task[]> => {
  try {
    const response = await fetch(`/api/tasks/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    console.log("Fetch tasks request:", response);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch tasks");
    }

    const data = await response.json();
    return data.tasks;
  } catch (error) {
    console.error("Fetch tasks request failed:", error);
    throw error;
  }
}