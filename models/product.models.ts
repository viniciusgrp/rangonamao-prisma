import { prisma } from '../lib/prisma';
import { AuthenticatedRequest } from '../types/middleware';

class ProductModel {
  async createProduct(data: any, storeId: string) {
    const { ingredients, ...productData } = data;

    const product = await prisma.product.create({
      data: productData,
    });

    if (ingredients && ingredients.length > 0) {
      for (const ingredientData of ingredients) {
        let ingredientId: string;

        if ('id' in ingredientData) {
          ingredientId = ingredientData.id;
        } else {
          const newIngredient = await prisma.ingredient.create({
            data: {
              name: ingredientData.name,
              description: ingredientData.description,
              price: ingredientData.price || 0,
              storeId,
            },
          });

          ingredientId = newIngredient.id;
        }

        await prisma.productIngredient.create({
          data: {
            productId: product.id,
            ingredientId,
          },
        });
      }
    }

    return await prisma.product.findUnique({
      where: { id: product.id },
      include: {
        category: true,
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });
  }

  async updateProduct(id: string, data: any, storeId: string) {
    const { ingredients, ...productData } = data;

    const product = await prisma.product.update({
      where: { id },
      data: productData,
    });

    if (ingredients) {
      await prisma.productIngredient.deleteMany({
        where: { productId: id },
      });

      for (const ingredientData of ingredients) {
        let ingredientId: string;

        if ('id' in ingredientData) {
          ingredientId = ingredientData.id;
        } else {
          const newIngredient = await prisma.ingredient.create({
            data: {
              name: ingredientData.name,
              description: ingredientData.description,
              price: ingredientData.price || 0,
              storeId,
            },
          });

          ingredientId = newIngredient.id;
        }
        await prisma.productIngredient.create({
          data: {
            productId: product.id,
            ingredientId,
          },
        });
      }
    }

    return await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });
  }

  async getProducts() {
    return prisma.product.findMany({
      include: {
        category: true,
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });
  }

  async getProductById(id: string) {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });
  }

  async deleteProduct(id: string) {
    await prisma.productIngredient.deleteMany({
      where: { productId: id },
    });

    return prisma.product.delete({
      where: { id },
      include: {
        category: true,
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    });
  }
}

export default new ProductModel();
