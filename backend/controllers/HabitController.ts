import type { FastifyRequest, FastifyReply } from 'fastify'
import { HabitRepository } from '../repositories/HabitRepository.js'
import { AvatarRepository } from '../repositories/AvatarRepository.js'

const repository = new HabitRepository();
const avatarRepository = new AvatarRepository();

export class HabitController {

    async create(request: FastifyRequest, reply: FastifyReply) {
        const { title, description, xpReward, frequency } = request.body as any;
        const user = request.user as any;
        const habit = await repository.create({ title, description, xpReward, frequency, userId: user.id });
        reply.status(201).send(habit);
    }

    async checkIn(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const user = request.user as any;

        const habit = await repository.findById(id);
        if (!habit) {
            return reply.status(404).send({ error: 'Habit not found' });
        }

        // Verify ownership (the habit model points to a task which points to userId)
        if ((habit as any).task.userId !== user.id) {
            return reply.status(403).send({ error: 'Forbidden' });
        }

        // Update streak
        const updatedHabit = await repository.update(id, { streak: { increment: 1 } });

        // Add progress (assuming 10 coins per check-in for habits)
        const updatedAvatar = await avatarRepository.addProgress(user.id, (habit as any).task.xpReward, 10);

        reply.status(200).send({ habit: updatedHabit, avatar: updatedAvatar });
    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        const habits = await repository.findAll();
        reply.status(200).send(habits);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        await repository.delete(id);
        reply.status(204).send();
    }

}