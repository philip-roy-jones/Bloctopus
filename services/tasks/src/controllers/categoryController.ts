import { Request, Response, NextFunction } from 'express';
import { categoryService } from '@/services/categoryService';
import { getUserId } from '@/helpers/getUserId';

// TODO: Sanitize and validate input data properly (skipping for now for simplicity)

export const index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('Fetching categories with query:', req.query);

    const userId = getUserId(req, res);
    if (!userId) return;

    const categories = await categoryService.index(
      userId,
      parseInt(req.query.page as string, 10) || 1,
      parseInt(req.query.pageSize as string, 10) || 10
    );

    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = getUserId(req, res);
    if (!userId) return;

    const categoryData: Category = req.body;

    if (!categoryData || !categoryData.name) {
      res.status(400).json({ message: 'Category data is required' });
      return;
    }

    const category = await categoryService.create(userId, categoryData);
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = getUserId(req, res);
    if (!userId) return;

    const categoryId = req.params.id;
    if (!categoryId) {
      res.status(400).json({ message: 'Category ID is required' });
      return;
    }

    const categoryData: Category = req.body;
    if (!categoryData) {
      res.status(400).json({ message: 'Category data is required' });
      return;
    }

    const updatedCategory = await categoryService.update(userId, categoryId, categoryData);

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

export const destroy = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = getUserId(req, res);
    if (!userId) return;

    const categoryId = req.params.id;
    if (!categoryId) {
      res.status(400).json({ message: 'Category ID is required' });
      return;
    }

    await categoryService.destroy(userId, req.params.id);
    
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};