import { Request, Response } from 'express';
import IngredientModel from '../models/ingredient.models';
import { ingredientResponseSchema, ingredientsResponseSchema } from '../schemas/ingredient.schema';
import { AuthenticatedRequest } from '../types/middleware';
import { ControllerFunction } from '../types/controller';

const IngredientController = {
  createIngredient: (async (req: AuthenticatedRequest, res: Response) => {
    try {
      const storeId = req.storeId;

      if (!storeId) {
        res.status(401).json({ message: 'Store not authenticated' });

        return;
      }

      const ingredient = await IngredientModel.createIngredient({
        ...req.body,
        storeId,
        price: req.body.price || 0,
      });
      const validatedIngredient = ingredientResponseSchema.parse(ingredient);

      res.status(201).json(validatedIngredient);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  getIngredients: (async (req: Request, res: Response) => {
    try {
      const ingredients = await IngredientModel.getIngredients();
      const validatedIngredients = ingredientsResponseSchema.parse(ingredients);

      res.status(200).json(validatedIngredients);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  getIngredientById: (async (req: Request, res: Response) => {
    try {
      const ingredient = await IngredientModel.getIngredientById(req.params.id);

      if (!ingredient) {
        res.status(404).json({ message: 'Ingredient not found' });

        return;
      }
      const validatedIngredient = ingredientResponseSchema.parse(ingredient);

      res.status(200).json(validatedIngredient);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  updateIngredient: (async (req: Request, res: Response) => {
    try {
      const ingredient = await IngredientModel.updateIngredient(req.params.id, req.body);
      const validatedIngredient = ingredientResponseSchema.parse(ingredient);

      res.status(200).json(validatedIngredient);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,

  deleteIngredient: (async (req: Request, res: Response) => {
    try {
      const ingredient = await IngredientModel.deleteIngredient(req.params.id);
      const validatedIngredient = ingredientResponseSchema.parse(ingredient);

      res.status(200).json(validatedIngredient);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }) as ControllerFunction,
};

export default IngredientController;
