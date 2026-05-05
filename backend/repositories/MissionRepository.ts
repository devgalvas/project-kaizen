import { prisma } from "../lib/prisma.js"
import { Prisma, type Mission } from "../src/generated/prisma/client.js";

interface CreateMissionDTO {
    title: string;
    description: string;
    xpReward: number;
    userId: string;
    coinReward: number;
    isDaily: boolean;
}

export class MissionRepository {
    async create(data: CreateMissionDTO): Promise<Mission> {
        return await prisma.mission.create({ 
            data: {
                coinReward: data.coinReward,
                isDaily: data.isDaily,
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

    async findAll(): Promise<Mission[]> {
        return await prisma.mission.findMany({ include: { task: true } });
    }

    async findById(id: string): Promise<Mission | null> {
        return await prisma.mission.findUnique({ where: { id }, include: { task: true } });
    }

    async update(id: string, data: Prisma.MissionUpdateInput): Promise<Mission> {
        return await prisma.mission.update({ where: { id }, data, include: { task: true } });
    }

    async delete(id: string): Promise<Mission> {
        return await prisma.mission.delete({ where: { id } });
    }
}
