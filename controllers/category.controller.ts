import { Response } from 'express';
import { prisma } from '../lib/prisma';
import { AuthenticatedRequest } from '../types/middleware';
import { ControllerFunction } from '../types/controller';
import { categoryResponseSchema, categoriesResponseSchema } from '../schemas/category.schema';

const CategoryController = {
  createCategory: (async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { name, description } = req.body;
      const storeId = req.storeId;

      if (!storeId) {
        res.status(401).json({ error: 'Store not authenticated' });
        return;
      }

      const category = await prisma.category.create({
        data: {
          name,
          description,
          storeId,
        },
        include: {
          Product: {
            include: {
              ingredients: {
                include: {
                  ingredient: true,
                },
              },
            },
          },
        },
      });

      const validatedCategory = categoryResponseSchema.parse(category);
      res.status(201).json(validatedCategory);
    } catch (error) {
      console.error('Error creating category:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }) as ControllerFunction,

  getCategoriesByStore: (async (req: AuthenticatedRequest, res: Response) => {
    const { storeId } = req.params;

    try {
      const categories = await prisma.category.findMany({
        where: { storeId },
        include: {
          Product: {
            include: {
              ingredients: {
                include: {
                  ingredient: true,
                },
              },
            },
          },
        },
      });

      const validatedCategories = categoriesResponseSchema.parse(categories);
      res.json(validatedCategories);
    } catch (error) {
      console.error('Error getting categories:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }) as ControllerFunction,

  updateCategory: (async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const storeId = req.storeId;

    if (!storeId) {
      res.status(401).json({ error: 'Store not authenticated' });
      return;
    }

    try {
      const category = await prisma.category.findUnique({
        where: { id },
      });

      if (!category) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }

      if (category.storeId !== storeId) {
        res.status(403).json({ error: 'Not authorized to update this category' });
        return;
      }

      const updatedCategory = await prisma.category.update({
        where: { id },
        data: {
          name,
          description,
        },
        include: {
          Product: {
            include: {
              ingredients: {
                include: {
                  ingredient: true,
                },
              },
            },
          },
        },
      });

      const validatedCategory = categoryResponseSchema.parse(updatedCategory);
      res.json(validatedCategory);
    } catch (error) {
      console.error('Error updating category:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }) as ControllerFunction,

  deleteCategory: (async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const storeId = req.storeId;

    if (!storeId) {
      res.status(401).json({ error: 'Store not authenticated' });
      return;
    }

    try {
      const category = await prisma.category.findUnique({
        where: { id },
        include: {
          Product: {
            include: {
              ingredients: {
                include: {
                  ingredient: true,
                },
              },
            },
          },
        },
      });

      if (!category) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }

      if (category.storeId !== storeId) {
        res.status(403).json({ error: 'Not authorized to delete this category' });
        return;
      }

      await prisma.category.delete({
        where: { id },
      });

      const validatedCategory = categoryResponseSchema.parse(category);
      res.json(validatedCategory);
    } catch (error) {
      console.error('Error deleting category:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }) as ControllerFunction,
};

export default CategoryController;
