import { Request, Response } from 'express';
import { taskService } from '../services/taskService';
import { TaskData } from '../types/TaskData';

// TODO: Sanitize and validate input data properly (skipping for now for simplicity)

export const getTasksByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.headers['x-user-id'] as string;
    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    const tasks = await taskService.getAllTasks(
      userId,
      parseInt(req.query.page as string, 10) || 1,
      parseInt(req.query.pageSize as string, 10) || 10
    );

    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.headers['x-user-id'] as string;
    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    const taskData: TaskData = req.body; // Use TaskData type for taskData

    if (!taskData || !taskData.title) {
      res.status(400).json({ message: 'Task data is required' });
      return;
    }

    const task = await taskService.createTask(userId, taskData);

    console.log('Task created:', task);

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.headers['x-user-id'] as string;
    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    const taskId = req.params.id;
    if (!taskId) {
      res.status(400).json({ message: 'Task ID is required' });
      return;
    }

    const taskData: TaskData = req.body;

    if (!taskData) {
      res.status(400).json({ message: 'Task data is required' });
      return;
    }

    const updatedTask = await taskService.updateTask(userId, taskId, taskData);

    console.log('Task updated:', updatedTask);

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.headers['x-user-id'] as string;
    if (!userId) {
      res.status(400).json({ message: 'User ID is required' });
      return;
    }

    const taskId = req.params.id;
    if (!taskId) {
      res.status(400).json({ message: 'Task ID is required' });
      return;
    }

    await taskService.deleteTask(userId, taskId);

    console.log(`Task with ID ${taskId} deleted`);

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};