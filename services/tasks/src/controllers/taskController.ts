import { Request, Response } from 'express';
import { taskService } from '../services/taskService';

export const getTasksByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;

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