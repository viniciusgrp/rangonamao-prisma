import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class CategoryModel {
  async createCategory(data: any) {
    return await prisma.category.create({
      data: data,
    });
  }

  async getCategories(storeUrl: string) {
    return await prisma.category.findMany({
      where: {
        store: {
          url: storeUrl,
        },
      },
      include: {
        Product: {
          include: {
            ingredients: {
              include: { ingredient: true },
            },
          },
        },
      },
    });
  }

  async updateCategory(id: string, data: any) {
    return await prisma.category.update({
      where: { id: id },
      data: data,
    });
  }

  async deleteCategory(id: string) {
    return await prisma.category.delete({
      where: { id: id },
    });
  }
}

export default new CategoryModel();
