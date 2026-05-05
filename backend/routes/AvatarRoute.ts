import type { FastifyInstance } from "fastify";
import { AvatarController } from "../controllers/AvatarController.js";
import { createAvatarBody, avatarSchema } from '../schemas/avatarSchema.js';

const controller = new AvatarController();

export async function avatarRoutes(app: FastifyInstance) {
    app.addHook('onRequest', app.authenticate)
    app.post('/avatar', {
        schema: {
            tags: ['Avatars'],
            summary: 'Create a new avatar',
            body: createAvatarBody,
            response: {
                201: avatarSchema
            }
        },
        handler: controller.create
    })

    app.get('/avatar', {
        schema: {
            tags: ['Avatars'],
            summary: 'List all avatars',
            response: {
                200: {
                    type: 'array',
                    items: avatarSchema
                }
            }
        },
        handler: controller.list
    })

    app.delete('/avatar/:id', {
        schema: {
            tags: ['Avatars'],
            summary: 'Delete a avatar',
            response: {
                204: {
                    type: 'null'
                }
            }
        },
        handler: controller.delete
    })
}