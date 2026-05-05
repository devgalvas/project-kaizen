import type { FastifyRequest, FastifyReply } from 'fastify'
import { MissionRepository } from '../repositories/MissionRepository.js'
import { AvatarRepository } from '../repositories/AvatarRepository.js'

const repository = new MissionRepository();
const avatarRepository = new AvatarRepository();

export class MissionController {

    async create(request: FastifyRequest, reply: FastifyReply) {
        const { title, description, xpReward, coinReward, isDaily } = request.body as any;
        const user = request.user as any;
        const mission = await repository.create({ title, description, xpReward, coinReward, isDaily, userId: user.id });
        reply.status(201).send(mission);
    }

    async complete(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const user = request.user as any;

        const mission = await repository.findById(id);
        if (!mission) {
            return reply.status(404).send({ error: 'Mission not found' });
        }

        if ((mission as any).task.userId !== user.id) {
            return reply.status(403).send({ error: 'Forbidden' });
        }

        const updatedAvatar = await avatarRepository.addProgress(user.id, (mission as any).task.xpReward, mission.coinReward);

        // Optional: delete the mission or mark it as completed. For now let's just delete it since it's completed.
        await repository.delete(id);

        reply.status(200).send({ mission, avatar: updatedAvatar });
    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        const missions = await repository.findAll();
        reply.status(200).send(missions);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        await repository.delete(id);
        reply.status(204).send();
    }

}