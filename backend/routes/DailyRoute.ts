import type { FastifyInstance } from "fastify"
import { DailyController } from "../controllers/DailyController.js"
import { createDailyBody, dailySchema } from "../schemas/dailySchema.js"

const controller = new DailyController();

export async function dailyRoutes(app: FastifyInstance) {
    app.addHook('onRequest', app.authenticate)
    
    app.post('/dailies', {
        schema: {
            tags: ['Dailies'],
            summary: 'Create a new daily',
            body: createDailyBody,
            response: {
                201: dailySchema
            }
        },
        handler: controller.create
    })

    app.post('/dailies/:id/checkin', {
        schema: {
            tags: ['Dailies'],
            summary: 'Check in a daily',
            response: {
                200: {
                    type: 'object',
                    properties: {
                        daily: dailySchema,
                        avatar: { type: 'object', additionalProperties: true }
                    }
                }
            }
        },
        handler: controller.checkIn
    })

    app.get("/dailies", {
        schema: {
            tags: ['Dailies'],
            summary: 'List all dailies',
            response: {
                200: {
                    type: 'array',
                    items: dailySchema
                }
            }
        },
        handler: controller.list
    })

    app.delete('/dailies/:id', {
        schema: {
            tags: ['Dailies'],
            summary: 'Delete a daily',
            response: {
                204: {
                    type: 'null'
                }
            }
        },
        handler: controller.delete
    })
}
