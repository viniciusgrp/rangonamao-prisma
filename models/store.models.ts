import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';
import {
  createStoreSchema,
  updateStoreSchema,
  storeResponseSchema,
  storesResponseSchema,
  CreateStoreInput,
  UpdateStoreInput,
  StoreResponse,
  StoresResponse,
} from '../schemas/store.schema';

const prisma = new PrismaClient();

class StoreModel {
  async createStore(data: CreateStoreInput): Promise<StoreResponse> {
    const validatedData = createStoreSchema.parse(data);
    const hashedPassword = hashSync(validatedData.password, 10);

    const store = await prisma.store.create({
      data: {
        ...validatedData,
        password: hashedPassword,
      },
    });

    return storeResponseSchema.parse(store);
  }

  async getStores(): Promise<StoresResponse> {
    const stores = await prisma.store.findMany();

    return storesResponseSchema.parse(stores);
  }

  async getStoreById(id: string): Promise<StoreResponse | null> {
    const store = await prisma.store.findUnique({
      where: {
        id: id,
      },
    });

    if (!store) {
      return null;
    }

    return storeResponseSchema.parse(store);
  }

  async getStoreByEmail(email: string) {
    const store = await prisma.store.findFirst({
      where: {
        email: email,
      },
    });

    return store;
  }

  async updateStore(id: string, data: UpdateStoreInput): Promise<StoreResponse> {
    const validatedData = updateStoreSchema.parse(data);

    if (validatedData.password) {
      validatedData.password = hashSync(validatedData.password, 10);
    }

    const store = await prisma.store.update({
      where: {
        id: id,
      },
      data: validatedData,
    });

    return storeResponseSchema.parse(store);
  }

  async deleteStore(id: string): Promise<StoreResponse> {
    const store = await prisma.store.delete({
      where: {
        id: id,
      },
    });

    return storeResponseSchema.parse(store);
  }
}

export default new StoreModel();
