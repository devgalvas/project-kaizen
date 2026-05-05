import { taskSchema } from './taskSchema.js'

export const missionSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        coinReward: { type: 'number' },
        isDaily: { type: 'boolean' },
        taskId: { type: 'string' },
        task: taskSchema
    }
}

export const createMissionBody = {
    type: 'object',
    required: ['title', 'description', 'xpReward', 'userId', 'coinReward', 'isDaily'],
    properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        xpReward: { type: 'number' },
        userId: { type: 'string' },
        coinReward: { type: 'number' },
        isDaily: { type: 'boolean' }
    }
}
