export const dailySchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        dueDate: { type: 'string', format: 'date-time' },
        isOverdue: { type: 'boolean' },
        taskId: { type: 'string' },
        task: {
            type: 'object',
            properties: {
                title: { type: 'string' },
                description: { type: 'string' },
                xpReward: { type: 'integer' }
            }
        }
    }
}

export const createDailyBody = {
    type: 'object',
    required: ['title', 'description', 'xpReward', 'dueDate'],
    properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        xpReward: { type: 'integer' },
        dueDate: { type: 'string', format: 'date-time' }
    }
}
