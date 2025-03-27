import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ProductModel {
  async createProduct(data: any) {
    const { ingredients, categoryId, storeId, ...productData } = data;
    
    return await prisma.product.create({
      data: {
        ...productData,
        category: {
          connect: { id: categoryId }
        },
        store: {
          connect: { id: storeId }
        },
        ingredients: {
          create: ingredients?.map((ingredient: any) => ({
            ingredient: {
              create: {
                name: ingredient.name,
                description: ingredient.description
              }
            }
          })) || []
        }
      },
      include: {
        category: true,
        store: true,
        ingredients: {
          include: {
            ingredient: true
          }
        }
      }
    });
  }

  async getProducts() {
    return await prisma.product.findMany();
  }

  async updateProduct(id: string, data: any) {
    return await prisma.product.update({
      where: { id: id },
      data: data,
    });
  }

  async deleteProduct(id: string) {
    return await prisma.product.delete({
      where: { id: id },
    });
  }
}

export default new ProductModel();
