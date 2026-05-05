import type { FastifyInstance } from 'fastify'
import { UserController } from "../controllers/UserController.js"
import { createUserBody, userSchema, loginUserBody, authResponseSchema } from '../schemas/userSchema.js'

const controller = new UserController()

export async function userRoutes(fastify: FastifyInstance) {
    fastify.post('/login', {
        schema: {
            tags: ['Auth'],
            summary: 'Authenticate user',
            body: loginUserBody,
            response: {
                200: authResponseSchema,
                401: {
                    type: 'object',
                    properties: { error: { type: 'string' } }
                }
            }
        },
        handler: controller.login
    })

    fastify.post('/users', {
        schema: {
            tags: ['Users'],
            summary: 'Create a new user',
            body: createUserBody,
            response: {
                201: userSchema
            }
        },
        handler: controller.create
    })

    fastify.get('/users', {
        onRequest: [fastify.authenticate],
        schema: {
            tags: ['Users'],
            summary: 'List all users',
            response: {
                200: {
                    type: 'array',
                    items: userSchema
                }
            }
        },
        handler: controller.list
    })

    fastify.delete('/users/:id', {
        onRequest: [fastify.authenticate],
        schema: {
            tags: ['Users'],
            summary: 'Delete a user',
            response: {
                204: {
                    type: 'null'
                }
            }
        },
        handler: controller.delete
    })
}