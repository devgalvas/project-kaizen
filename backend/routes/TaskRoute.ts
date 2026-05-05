import type { FastifyInstance } from 'fastify'
import { TaskController } from '../controllers/TaskController.js'
import { createTaskBody, taskSchema } from '../schemas/taskSchema.js'

const controller = new TaskController()

export async function taskRoutes(app: FastifyInstance) {
    app.addHook('onRequest', app.authenticate)
    app.post('/tasks', {
        schema: {
            tags: ['Tasks'],
            summary: 'Create a new task',
            body: createTaskBody,
            response: {
                201: taskSchema
            }
        },
        handler: controller.create
    })

    app.get('/tasks', {
        schema: {
            tags: ['Tasks'],
            summary: 'List all tasks',
            response: {
                200: {
                    type: 'array',
                    items: taskSchema
                }
            }
        },
        handler: controller.list
    })

    app.delete('/tasks/:id', {
        schema: {
            tags: ['Tasks'],
            summary: 'Delete a task',
            response: {
                204: {
                    type: 'null'
                }
            }
        },
        handler: controller.delete
    })
}