// Interface for creating a task
export interface CreateTask {
  title: string;
  description?: string;
  startTime?: string; // ISO date string
  endTime?: string; // ISO date string
}

// Interface for updating a task
export interface UpdateTask {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  startTime?: string; // ISO date string
  endTime?: string; // ISO date string
}