import type { FastifyRequest, FastifyReply } from 'fastify'
import { TaskRepository } from '../repositories/TaskRepository.js'

const repository = new TaskRepository();

export class TaskController {

    async create(request: FastifyRequest, reply: FastifyReply) {
        const { title, description, status, userId } = request.body as any;
        const task = await repository.create({ title, description, status, userId });
        reply.status(201).send(task);
    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        const tasks = await repository.findAll();
        reply.status(200).send(tasks);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        await repository.delete(id);
        reply.status(204).send();
    }

}