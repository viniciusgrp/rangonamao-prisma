import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class StoreModel {
  async createStore(data: any) {
    return await prisma.store.create({
      data: data,
    });
  }

  async getStores() {
    return await prisma.store.findMany();
  }

  async getStoreById(id: string) {
    return await prisma.store.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateStore(id: string, data: any) {
    return await prisma.store.update({
      where: {
        id: id,
      },
      data: data,
    });
  }
}

export default new StoreModel();
