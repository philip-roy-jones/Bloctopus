export interface Task { 
  id: string;
  title: string;
  description: string;
  completed: boolean;
  scheduledDate?: Date;
  startTime?: Date;
  endTime?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  scheduledDate?: Date;
  startTime?: Date;
  endTime?: Date;
  categoryIds?: string[];
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  completed?: boolean;
  scheduledDate?: Date;
  startTime?: Date;
  endTime?: Date;
  categoryIds?: string[];
}