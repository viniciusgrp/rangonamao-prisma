import { prisma } from '../lib/prisma';
import {
  createProductIngredientSchema,
  productIngredientResponseSchema,
  productIngredientsResponseSchema,
  CreateProductIngredientInput,
  ProductIngredientResponse,
  ProductIngredientsResponse,
} from '../schemas/product-ingredient.schema';

interface CreateProductIngredientData {
  productId: string;
  ingredientId: string;
}

const ProductIngredientModel = {
  async createProductIngredient(
    data: CreateProductIngredientData,
  ): Promise<ProductIngredientResponse> {
    const validatedData = createProductIngredientSchema.parse(data);

    const productIngredient = await prisma.productIngredient.create({
      data,
      include: {
        product: true,
        ingredient: true,
      },
    });

    return productIngredientResponseSchema.parse(productIngredient);
  },

  async getProductIngredients(
    productId: string,
  ): Promise<ProductIngredientsResponse> {
    const productIngredients = await prisma.productIngredient.findMany({
      where: {
        productId,
      },
      include: {
        product: true,
        ingredient: true,
      },
    });

    return productIngredientsResponseSchema.parse(productIngredients);
  },

  async deleteProductIngredient(id: string): Promise<void> {
    await prisma.productIngredient.delete({
      where: {
        id,
      },
    });
  },

  async deleteProductIngredients(productId: string): Promise<void> {
    await prisma.productIngredient.deleteMany({
      where: {
        productId,
      },
    });
  },
};

export default ProductIngredientModel;
