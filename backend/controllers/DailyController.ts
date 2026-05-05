import type { FastifyRequest, FastifyReply } from 'fastify'
import { DailyRepository } from '../repositories/DailyRepository.js'
import { AvatarRepository } from '../repositories/AvatarRepository.js'

const repository = new DailyRepository();
const avatarRepository = new AvatarRepository();

export class DailyController {

    async create(request: FastifyRequest, reply: FastifyReply) {
        const { title, description, xpReward, dueDate } = request.body as any;
        const user = request.user as any;
        const daily = await repository.create({ title, description, xpReward, dueDate: new Date(dueDate), userId: user.id });
        reply.status(201).send(daily);
    }

    async checkIn(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const user = request.user as any;

        const daily = await repository.findById(id);
        if (!daily) {
            return reply.status(404).send({ error: 'Daily not found' });
        }

        if ((daily as any).task.userId !== user.id) {
            return reply.status(403).send({ error: 'Forbidden' });
        }

        const updatedAvatar = await avatarRepository.addProgress(user.id, (daily as any).task.xpReward, 5);

        // Daily might be deleted or marked as completed. We will delete it.
        await repository.delete(id);

        reply.status(200).send({ daily, avatar: updatedAvatar });
    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        const dailies = await repository.findAll();
        reply.status(200).send(dailies);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        await repository.delete(id);
        reply.status(204).send();
    }
}
