import type { FastifyRequest, FastifyReply } from 'fastify'
import { UserRepository } from '../repositories/UserRepository.js'
import { hashPassword, verifyPassword } from '../src/models/utils/hash.js'

const repository = new UserRepository();

export class UserController {
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = request.body as any;
        const passwordHash = await hashPassword(password);
        const user = await repository.create({ email, passwordHash });
        reply.status(201).send(user);
    }

    async login(request: FastifyRequest, reply: FastifyReply) {
        const { email, password } = request.body as any;
        const user = await repository.findByEmail(email);

        if (!user) {
            return reply.status(401).send({ error: 'Credenciais inválidas.' });
        }

        const isMatch = await verifyPassword(password, user.passwordHash);

        if (!isMatch) {
            return reply.status(401).send({ error: 'Credenciais inválidas.' });
        }

        const token = request.server.jwt.sign({ id: user.id, email: user.email });

        reply.status(200).send({ token, user });
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