import type { FastifyInstance } from 'fastify'
import { TaskController } from '../controllers/TaskController.js'

const controller = new TaskController()

export async function taskRoutes(app: FastifyInstance) {
    app.post('/tasks', controller.create)
    app.get('/tasks', controller.list)
    app.delete('/tasks/:id', controller.delete)
}