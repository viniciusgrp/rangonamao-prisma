import { prisma } from '../lib/prisma';

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  cpf: string;
}

const UserModel = {
  async createUser(data: CreateUserData) {
    const { name, email, password, cpf } = data;

    return prisma.user.create({
      data: {
        name,
        email,
        password,
        cpf,
      },
    });
  },

  async getUsers() {
    return prisma.user.findMany({
      select: {
        userId: true,
        name: true,
        email: true,
        cpf: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async getUserById(userId: string) {
    return prisma.user.findUnique({
      where: { userId },
      select: {
        userId: true,
        name: true,
        email: true,
        cpf: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async getUserByEmailWithPassword(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: {
        userId: true,
        name: true,
        email: true,
        password: true,
        cpf: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async updateUser(userId: string, data: Partial<CreateUserData>) {
    const { name, email, password, cpf } = data;

    return prisma.user.update({
      where: { userId },
      data: {
        name,
        email,
        password,
        cpf,
      },
      select: {
        userId: true,
        name: true,
        email: true,
        cpf: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  },

  async deleteUser(userId: string) {
    return prisma.user.delete({
      where: { userId },
    });
  },
};

export default UserModel;
