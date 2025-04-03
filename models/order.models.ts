import { prisma } from '../lib/prisma';
import { createOrderSchema } from '../schemas/order.schema';

class OrderModel {
  async createOrder(data: any) {
    const validatedData = createOrderSchema.parse(data);

    const order = await prisma.order.create({
      data: {
        userId: validatedData.userId,
        storeId: validatedData.storeId,
        products: {
          create: validatedData.products.map((product: any) => ({
            productId: product.productId,
            quantity: product.quantity,
            price: 0, // This should be fetched from the product
          })),
        },
      },
      include: {
        user: true,
        store: true,
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    return order;
  }

  async getOrders() {
    return prisma.order.findMany({
      include: {
        user: true,
        store: true,
        products: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async getOrderById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        store: true,
        products: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async updateOrder(id: string, data: any) {
    return prisma.order.update({
      where: { id },
      data: {
        products: {
          deleteMany: {},
          create: data.products.map((product: any) => ({
            productId: product.productId,
            quantity: product.quantity,
            price: 0, // This should be fetched from the product
          })),
        },
      },
      include: {
        user: true,
        store: true,
        products: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async deleteOrder(id: string) {
    return prisma.order.delete({
      where: { id },
      include: {
        user: true,
        store: true,
        products: {
          include: {
            product: true,
          },
        },
      },
    });
  }
}

export default new OrderModel();
