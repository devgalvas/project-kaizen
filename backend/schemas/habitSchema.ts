import { taskSchema } from './taskSchema.js'

export const habitSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        streak: { type: 'number' },
        frequency: { type: 'string' },
        taskId: { type: 'string' },
        task: taskSchema
    }
}

export const createHabitBody = {
    type: 'object',
    required: ['title', 'description', 'xpReward', 'userId', 'frequency'],
    properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        xpReward: { type: 'number' },
        userId: { type: 'string' },
        frequency: { type: 'string' }
    }
}