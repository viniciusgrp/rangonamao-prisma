import { Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { AuthenticatedRequest } from '../types/middleware';
import { ControllerFunction } from '../types/controller';

const IngredientController = {
  createIngredient: (async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { name, description } = req.body;

      const ingredient = await prisma.ingredient.create({
        data: {
          name,
          description,
        },
      });

      res.status(201).json(ingredient);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }) as ControllerFunction,

  getIngredientById: (async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    try {
      const ingredient = await prisma.ingredient.findUnique({
        where: { id },
        include: {
          products: true,
        },
      });

      if (!ingredient) {
        res.status(404).json({ error: 'Ingredient not found' });
        return;
      }

      res.json(ingredient);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }) as ControllerFunction,

  updateIngredient: (async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const ingredient = await prisma.ingredient.findUnique({
        where: { id },
      });

      if (!ingredient) {
        res.status(404).json({ error: 'Ingredient not found' });
        return;
      }

      const updatedIngredient = await prisma.ingredient.update({
        where: { id },
        data: {
          name,
          description,
        },
      });

      res.json(updatedIngredient);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }) as ControllerFunction,

  deleteIngredient: (async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    try {
      const ingredient = await prisma.ingredient.findUnique({
        where: { id },
      });

      if (!ingredient) {
        res.status(404).json({ error: 'Ingredient not found' });
        return;
      }

      await prisma.ingredient.delete({
        where: { id },
      });

      res.json(ingredient);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }) as ControllerFunction,
};

export default IngredientController; 