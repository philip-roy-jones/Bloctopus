import { Request, Response, NextFunction } from 'express';
import { taskService } from '../services/taskService';
import { CreateTaskInput, UpdateTaskInput } from '../types/Task';
import { getUserId } from '@/helpers/getUserId';
import { publishReminder } from '@/events/publishReminder';

// TODO: Sanitize and validate input data properly (skipping for now for simplicity)

export const index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = getUserId(req, res);
    if (!userId) return;

    const tasks = await taskService.index(
      userId,
      parseInt(req.query.page as string, 10) || 1,
      parseInt(req.query.pageSize as string, 10) || 10
    );

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

export const show = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = getUserId(req, res);
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
  try {
    const userId = getUserId(req, res);
    if (!userId) return;

    const taskData: CreateTaskInput = req.body; // Use Task type for taskData

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
    const userId = getUserId(req, res);
    if (!userId) return;

    const taskId = req.params.id;
    if (!taskId) {
      res.status(400).json({ message: 'Task ID is required' });
      return;
    }

    const taskData: UpdateTaskInput = req.body;

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
    const userId = getUserId(req, res);
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

export const test = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  publishReminder({
    taskId: 'test-task-id',
    userId: 'test-user-id',
    title: 'Test Task',
    remindAt: new Date().toISOString()
  });
  res.status(200).json({ message: 'Test reminder published' });
};