import { Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { AuthenticatedRequest } from '../types/middleware';
import { ControllerFunction } from '../types/controller';

const CategoryController = {
  createCategory: (async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { name, description, storeId } = req.body;

      const category = await prisma.category.create({
        data: {
          name,
          description,
          storeId,
        },
      });

      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }) as ControllerFunction,

  getCategoriesByStore: (async (req: AuthenticatedRequest, res: Response) => {
    const { storeId } = req.params;

    try {
      const categories = await prisma.category.findMany({
        where: { storeId },
      });

      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }) as ControllerFunction,

  updateCategory: (async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const category = await prisma.category.findUnique({
        where: { id },
      });

      if (!category) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }

      const updatedCategory = await prisma.category.update({
        where: { id },
        data: {
          name,
          description,
        },
      });

      res.json(updatedCategory);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }) as ControllerFunction,

  deleteCategory: (async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    try {
      const category = await prisma.category.findUnique({
        where: { id },
      });

      if (!category) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }

      await prisma.category.delete({
        where: { id },
      });

      res.json(category);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }) as ControllerFunction,
};

export default CategoryController;
