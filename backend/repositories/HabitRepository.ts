import { prisma } from "../lib/prisma.js"
import { Prisma, type Habit } from "../src/generated/prisma/client.js";

interface CreateHabitDTO {
    title: string;
    description: string;
    xpReward: number;
    userId: string;
    frequency: string;
}

export class HabitRepository {
    async create(data: CreateHabitDTO): Promise<Habit> {
        return await prisma.habit.create({ 
            data: {
                frequency: data.frequency,
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

    async findAll(): Promise<Habit[]> {
        return await prisma.habit.findMany({ include: { task: true } });
    }

    async findById(id: string): Promise<Habit | null> {
        return await prisma.habit.findUnique({ where: { id }, include: { task: true } });
    }

    async update(id: string, data: Prisma.HabitUpdateInput): Promise<Habit> {
        return await prisma.habit.update({ where: { id }, data, include: { task: true } });
    }

    async delete(id: string): Promise<Habit> {
        return await prisma.habit.delete({ where: { id } });
    }
}