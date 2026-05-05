import type { FastifyInstance } from "fastify"
import { HabitController } from "../controllers/HabitController.js"
import { createHabitBody, habitSchema } from "../schemas/habitSchema.js"

const controller = new HabitController();

export async function habitRoutes(app: FastifyInstance) {
    app.addHook('onRequest', app.authenticate)
    app.post('/habit', {
        schema: {
            tags: ['Habits'],
            summary: 'Create a new habit',
            body: createHabitBody,
            response: {
                201: habitSchema
            }
        },
        handler: controller.create
    })

    app.post('/habit/:id/checkin', {
        schema: {
            tags: ['Habits'],
            summary: 'Check in a habit',
            response: {
                200: {
                    type: 'object',
                    properties: {
                        habit: habitSchema,
                        avatar: { type: 'object', additionalProperties: true }
                    }
                }
            }
        },
        handler: controller.checkIn
    })

    app.get("/habit", {
        schema: {
            tags: ['Habits'],
            summary: 'List all habits',
            response: {
                200: {
                    type: 'array',
                    items: habitSchema
                }
            }
        },
        handler: controller.list
    })

    app.delete('/habit/:id', {
        schema: {
            tags: ['Habits'],
            summary: 'Delete a habit',
            response: {
                204: {
                    type: 'null'
                }
            }
        },
        handler: controller.delete
    })
}


