import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class AddressModel {
  async createAddress(data: any) {
    return await prisma.address.create({
      data: data,
    });
  }

  async getAddresses() {
    return await prisma.address.findMany();
  }

  async getAddressById(id: string) {
    return await prisma.address.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateAddress(id: string, data: any) {
    return await prisma.address.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async deleteAddress(id: string) {
    return await prisma.address.delete({
      where: {
        id: id,
      },
    });
  }
}

export default new AddressModel();
