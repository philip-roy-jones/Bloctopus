import { RequestHandler } from 'express';
import { userService } from '../services/userService';
import { AuthRequest } from '../@types/express';

export const getUserEmail: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      res.status(400).json({ error: 'User ID is required' });
      return;
    }

    const user = await userService.getUserEmail(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json({ email: user.email });
  } catch (error: any) {
    console.error('Error fetching user email:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch user email' });
  }
};

export const getMe: RequestHandler = async (req: AuthRequest, res): Promise<void> => {
  try {
    const userParam = req.user;
    if (!userParam) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
    const user = await userService.getMe(userParam.userId);
    console.log('User fetched:', user);
    res.status(200).json(user);
  } catch (error: any) {
    console.log('Error fetching user:', error);
    res.status(400).json({ error: error.message || 'Failed to fetch user' });
  }
};