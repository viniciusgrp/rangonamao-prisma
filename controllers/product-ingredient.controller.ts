import { Request, Response } from 'express';
import ProductIngredientModel from '../models/product-ingredient.models';
import { prisma } from '../lib/prisma';
import {
  productIngredientResponseSchema,
  productIngredientsResponseSchema,
} from '../schemas/product-ingredient.schema';
import { ControllerFunction } from '../types/controller';

const ProductIngredientController = {
  createProductIngredient: (async (req: Request, res: Response) => {
    try {
      const { productId, ingredientId } = req.body;

      const product = await prisma.product.findUnique({
        where: { id: productId },
        include: { category: true },
      });

      if (!product) {
        res.status(404).json({ error: 'Product not found' });

        return;
      }

      const ingredient = await prisma.ingredient.findUnique({
        where: { id: ingredientId },
      });

      if (!ingredient) {
        res.status(404).json({ error: 'Ingredient not found' });

        return;
      }

      const productIngredient = await ProductIngredientModel.createProductIngredient({
        productId,
        ingredientId,
      });

      const validatedProductIngredient = productIngredientResponseSchema.parse(productIngredient);

      res.status(201).json(validatedProductIngredient);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }) as ControllerFunction,

  getProductIngredients: (async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;

      const productIngredients = await ProductIngredientModel.getProductIngredients(productId);
      const validatedProductIngredients =
        productIngredientsResponseSchema.parse(productIngredients);

      res.status(200).json(validatedProductIngredients);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }) as ControllerFunction,

  deleteProductIngredient: (async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await ProductIngredientModel.deleteProductIngredient(id);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }) as ControllerFunction,

  deleteProductIngredients: (async (req: Request, res: Response) => {
    try {
      const { productId } = req.params;

      await ProductIngredientModel.deleteProductIngredients(productId);
      res.status(204).send();
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }) as ControllerFunction,
};

export default ProductIngredientController;
