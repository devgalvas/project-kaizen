export const avatarSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        level: { type: 'number' },
        currentXP: { type: 'number' },
        coins: { type: 'number' },
        userId: { type: 'string' }
    }
}

export const createAvatarBody = {
    type: 'object',
    required: ['userId'],
    properties: {
        userId: { type: 'string' }
    }
}
