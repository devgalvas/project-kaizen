import { prisma } from "../lib/prisma.js";
import { Prisma, type User } from "../src/generated/prisma/client.js";

export class UserRepository {
    async create(data: Prisma.UserCreateInput): Promise<User> {
        return await prisma.user.create({ data });
    }

    async findAll(): Promise<User[]> {
        return await prisma.user.findMany({ include: { avatar: true } });
    }

    async findById(id: string): Promise<User | null> {
        return await prisma.user.findUnique({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({ where: { email } });
    }

    async update(id: string, data: Prisma.UserUpdateInput): Promise<User> {
        return await prisma.user.update({ where: { id }, data });
    }

    async delete(id: string): Promise<User> {
        return await prisma.user.delete({ where: { id } });
    }
}

