import { Request, Response, NextFunction } from 'express';
import { taskService } from '../services/taskService';
import { CreateTaskInput, UpdateTaskInput } from '../types/Task';

// TODO: Sanitize and validate input data properly (skipping for now for simplicity)

export const index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).userId;
    if (!userId) return;

    const tasks = await taskService.index(
      userId
    );

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).userId;
    if (!userId) return;

    const taskId = req.params.id;
    if (!taskId) {
      res.status(400).json({ message: 'Task ID is required' });
      return;
    }

    const task = await taskService.show(userId, taskId);

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  console.log('Creating task with data:', req.body);
  try {
    const userId = (req as any).userId;
    if (!userId) return;

    const taskData: CreateTaskInput = req.body;
    console.log('Task data:', taskData);
    if (!taskData || !taskData.title) {
      res.status(400).json({ message: 'Task data is required' });
      return;
    }

    const task = await taskService.create(userId, taskData);

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).userId;
    if (!userId) return;

    const taskId = req.params.id;
    if (!taskId) {
      res.status(400).json({ message: 'Task ID is required' });
      return;
    }

    const taskData: UpdateTaskInput = req.body;
    console.log('Task data:', taskData);

    if (!taskData) {
      res.status(400).json({ message: 'Task data is required' });
      return;
    }

    const updatedTask = await taskService.update(userId, taskId, taskData);

    res.status(200).json(updatedTask);
  } catch (error) {
    console.log('Error updating task:', error);
    next(error);
  }
}

export const destroy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = (req as any).userId;
    if (!userId) return;

    const taskId = req.params.id;
    if (!taskId) {
      res.status(400).json({ message: 'Task ID is required' });
      return;
    }

    await taskService.destroy(userId, taskId);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};