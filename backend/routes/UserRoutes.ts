import type { FastifyInstance } from 'fastify'
import { UserController } from "../controllers/UserController.js"

const controller = new UserController()

export async function userRoutes(fastify: FastifyInstance) {
    fastify.post('/users', controller.create)
    fastify.get('/users', controller.list)
    fastify.delete('/users/:id', controller.delete)
}