import { prisma } from "../lib/prisma.js"
import { Prisma, type Daily } from "../src/generated/prisma/client.js";

interface CreateDailyDTO {
    title: string;
    description: string;
    xpReward: number;
    userId: string;
    dueDate: Date;
}

export class DailyRepository {
    async create(data: CreateDailyDTO): Promise<Daily> {
        return await prisma.daily.create({
            data: {
                dueDate: data.dueDate,
                task: {
                    create: {
                        title: data.title,
                        description: data.description,
                        xpReward: data.xpReward,
                        userId: data.userId
                    }
                }
            },
            include: { task: true }
        });
    }

    async findAll(): Promise<Daily[]> {
        return await prisma.daily.findMany({ include: { task: true } });
    }

    async findById(id: string): Promise<Daily | null> {
        return await prisma.daily.findUnique({ where: { id }, include: { task: true } });
    }

    async update(id: string, data: Prisma.DailyUpdateInput): Promise<Daily> {
        return await prisma.daily.update({ where: { id }, data, include: { task: true } });
    }

    async delete(id: string): Promise<Daily> {
        return await prisma.daily.delete({ where: { id } });
    }
}
