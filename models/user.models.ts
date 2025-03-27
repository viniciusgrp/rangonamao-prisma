import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class UserModel {
  async createUser(data: any) {
    return await prisma.user.create({
      data: data,
    });
  }

  async getUsers() {
    return await prisma.user.findMany();
  }

  async getUserById(userId: string) {
    return await prisma.user.findUnique({
      where: {
        userId: userId,
      },
    });
  }

  async updateUser(userId: string, data: any) {
    return await prisma.user.update({
      where: {
        userId: userId,
      },
      data: data,
    });
  }
}

export default new UserModel();
