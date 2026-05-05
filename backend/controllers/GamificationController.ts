import type { FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma.js'

export class GamificationController {
    // --- Store & Items ---
    async listItems(request: FastifyRequest, reply: FastifyReply) {
        const items = await prisma.item.findMany();
        reply.send(items);
    }

    async buyItem(request: FastifyRequest, reply: FastifyReply) {
        const { itemId } = request.params as { itemId: string };
        const user = request.user as any;

        const item = await prisma.item.findUnique({ where: { id: itemId }});
        if (!item) return reply.status(404).send({ error: 'Item not found' });
        
        const avatar = await prisma.avatar.findUnique({ where: { userId: user.id }});
        if (!avatar) return reply.status(404).send({ error: 'Avatar not found' });
        
        if (avatar.coins < item.price) {
            return reply.status(400).send({ error: 'Not enough coins' });
        }
        
        const updatedAvatar = await prisma.avatar.update({
            where: { userId: user.id },
            data: { coins: avatar.coins - item.price }
        });
        
        reply.send({ message: 'Item purchased', item, avatar: updatedAvatar });
    }

    // --- SkillTree ---
    async getSkillTree(request: FastifyRequest, reply: FastifyReply) {
        const user = request.user as any;
        const avatar = await prisma.avatar.findUnique({ 
            where: { userId: user.id }, 
            include: { skillTrees: true } 
        });
        reply.send(avatar?.skillTrees || []);
    }
    
    // --- Achievements ---
    async getAchievements(request: FastifyRequest, reply: FastifyReply) {
        const user = request.user as any;
        const avatar = await prisma.avatar.findUnique({ 
            where: { userId: user.id }, 
            include: { achievements: true } 
        });
        reply.send(avatar?.achievements || []);
    }

    // --- Notifications ---
    async getNotifications(request: FastifyRequest, reply: FastifyReply) {
        const user = request.user as any;
        const notifs = await prisma.notification.findMany({ 
            where: { userId: user.id } 
        });
        reply.send(notifs);
    }

    async deleteNotification(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const user = request.user as any;

        const notif = await prisma.notification.findUnique({ where: { id }});
        if (!notif || notif.userId !== user.id) {
            return reply.status(403).send({ error: 'Forbidden' });
        }

        await prisma.notification.delete({ where: { id } });
        reply.status(204).send();
    }
}
