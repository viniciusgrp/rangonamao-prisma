import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class IngredientModel {
  async createIngredient(data: any) {
    return await prisma.ingredient.create({
      data: {
        name: data.name,
        description: data.description,
      },
      include: {
        products: {
          include: {
            product: true
          }
        }
      }
    });
  }

  async getIngredients() {
    return await prisma.ingredient.findMany({
      include: {
        products: {
          include: {
            product: true
          }
        }
      }
    });
  }

  async getIngredientById(id: string) {
    return await prisma.ingredient.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            product: true
          }
        }
      }
    });
  }

  async updateIngredient(id: string, data: any) {
    return await prisma.ingredient.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
      },
      include: {
        products: {
          include: {
            product: true
          }
        }
      }
    });
  }

  async deleteIngredient(id: string) {
    return await prisma.ingredient.delete({
      where: { id },
      include: {
        products: {
          include: {
            product: true
          }
        }
      }
    });
  }
}

export default new IngredientModel(); 