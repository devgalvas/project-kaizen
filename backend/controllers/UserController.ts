import type { FastifyRequest, FastifyReply } from 'fastify'
import { UserRepository } from '../repositories/UserRepository.js'

const repository = new UserRepository();

export class UserController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { name, email, passwordHash } = request.body as any;
        const user = await repository.create({ name, email, passwordHash });
        reply.status(201).send(user);
    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        const users = await repository.findAll();
        reply.status(200).send(users);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        await repository.delete(id);
        reply.status(204).send();
    }


}