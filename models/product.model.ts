import { prisma } from '../lib/prisma';

class ProductModel {
  async createProduct(data: {
    name: string;
    description: string;
    price: number;
    categoryId: string;
    image?: string;
    storeId: string;
  }) {
    // Verifica se a categoria pertence à loja
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
      include: { store: true },
    });

    if (!category || category.store.id !== data.storeId) {
      throw new Error('Category not found or does not belong to the store');
    }

    return prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        image: data.image,
        category: {
          connect: {
            id: data.categoryId,
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

  async updateProduct(id: string, data: {
    name: string;
    description: string;
    price: number;
    categoryId: string;
    image?: string;
  }) {
    return prisma.product.update({
      where: { id },
      data,
    });
  }

  async deleteProduct(id: string) {
    return prisma.product.delete({
      where: { id },
    });
  }
}

export default new ProductModel();
