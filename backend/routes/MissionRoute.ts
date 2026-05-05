import type { FastifyInstance } from "fastify";
import { MissionController } from "../controllers/MissionController.js";
import { createMissionBody, missionSchema } from '../schemas/missionSchema.js';

const controller = new MissionController()

export async function missionRoutes(app: FastifyInstance) {
    app.addHook('onRequest', app.authenticate)
    app.post('/missions', {
        schema: {
            tags: ['Missions'],
            summary: 'Create a new mission',
            body: createMissionBody,
            response: {
                201: missionSchema
            }
        },
        handler: controller.create
    })

    app.post('/missions/:id/complete', {
        schema: {
            tags: ['Missions'],
            summary: 'Complete a mission',
            response: {
                200: {
                    type: 'object',
                    properties: {
                        mission: missionSchema,
                        avatar: { type: 'object', additionalProperties: true }
                    }
                }
            }
        },
        handler: controller.complete
    })

    app.get('/missions', {
        schema: {
            tags: ['Missions'],
            summary: 'List all missions',
            response: {
                200: {
                    type: 'array',
                    items: missionSchema
                }
            }
        },
        handler: controller.list
    })

    app.delete('/missions/:id', {
        schema: {
            tags: ['Missions'],
            summary: 'Delete a mission',
            response: {
                204: {
                    type: 'null'
                }
            }
        },
        handler: controller.delete
    })
}