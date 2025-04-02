import { prisma } from '../lib/prisma';

class CategoryModel {
  async createCategory(data: { name: string; description: string; storeId: string }) {
    return prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
        store: {
          connect: {
            id: data.storeId,
          },
        },
      },
    });
  }

  async getCategoriesByStore(storeId: string) {
    return prisma.category.findMany({
      where: {
        store: {
          id: storeId,
        },
      },
    });
  }

  async updateCategory(id: string, data: { name: string; description: string }) {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: string) {
    return prisma.category.delete({
      where: { id },
    });
  }
}

export default new CategoryModel();
