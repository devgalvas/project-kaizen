import { prisma } from "../lib/prisma.js"
import { Prisma, type Avatar } from "../src/generated/prisma/client.js";

export class AvatarRepository {
    async create(data: Prisma.AvatarCreateInput): Promise<Avatar> {
        return await prisma.avatar.create({ data });
    }

    async findAll(): Promise<Avatar[]> {
        return await prisma.avatar.findMany();
    }

    async findById(id: string): Promise<Avatar | null> {
        return await prisma.avatar.findUnique({ where: { id } });
    }

    async findByUserId(userId: string): Promise<Avatar | null> {
        return await prisma.avatar.findUnique({ where: { userId } });
    }

    async addProgress(userId: string, xpGain: number, coinsGain: number): Promise<Avatar> {
        const avatar = await this.findByUserId(userId);
        if (!avatar) throw new Error("Avatar not found");

        let { currentXP, level, coins } = avatar;
        currentXP += xpGain;
        coins += coinsGain;

        let xpNeeded = level * 100;
        while (currentXP >= xpNeeded) {
            currentXP -= xpNeeded;
            level += 1;
            xpNeeded = level * 100;
        }

        return await prisma.avatar.update({
            where: { userId },
            data: { currentXP, level, coins }
        });
    }

    async update(id: string, data: Prisma.AvatarUpdateInput): Promise<Avatar> {
        return await prisma.avatar.update({ where: { id }, data });
    }

    async delete(id: string): Promise<Avatar> {
        return await prisma.avatar.delete({ where: { id } });
    }
}
