import { prisma } from "../lib/prisma.js";
import { Prisma, type Task } from "../src/generated/prisma/client.js";

export class TaskRepository {
    async create(data: Prisma.TaskCreateInput): Promise<Task> {
        return await prisma.task.create({ data });
    }

    async findAll(): Promise<Task[]> {
        return await prisma.task.findMany({ include: { user: true } });
    }

    async findById(id: string): Promise<Task | null> {
        return await prisma.task.findUnique({ where: { id } });
    }

    async update(id: string, data: Prisma.TaskUpdateInput): Promise<Task> {
        return await prisma.task.update({ where: { id }, data });
    }

    async delete(id: string): Promise<Task> {
        return await prisma.task.delete({ where: { id } });
    }
}
