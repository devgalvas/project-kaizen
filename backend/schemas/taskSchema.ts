export const taskSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        title: { type: 'string' },
        description: { type: 'string' },
        xpReward: { type: 'number' },
        userId: { type: 'string' }
    }
}

export const createTaskBody = {
    type: 'object',
    required: ['title', 'description', 'xpReward', 'userId'],
    properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        xpReward: { type: 'number' },
        userId: { type: 'string' }
    }
}
