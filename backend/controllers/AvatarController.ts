import type { FastifyRequest, FastifyReply } from 'fastify'
import { AvatarRepository } from '../repositories/AvatarRepository.js'

const repository = new AvatarRepository();

export class AvatarController {

    async create(request: FastifyRequest, reply: FastifyReply) {
        const { userId } = request.body as any;
        const avatar = await repository.create({ user: { connect: { id: userId } } });
        reply.status(201).send(avatar);
    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        const avatars = await repository.findAll();
        reply.status(200).send(avatars);
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        await repository.delete(id);
        reply.status(204).send();
    }

}