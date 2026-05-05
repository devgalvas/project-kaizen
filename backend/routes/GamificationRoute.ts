import type { FastifyInstance } from "fastify"
import { GamificationController } from "../controllers/GamificationController.js"

const controller = new GamificationController();

export async function gamificationRoutes(app: FastifyInstance) {
    app.addHook('onRequest', app.authenticate)

    // Store & Items
    app.get('/store/items', {
        schema: { tags: ['Store'], summary: 'List all store items' },
        handler: controller.listItems
    })
    app.post('/store/buy/:itemId', {
        schema: { tags: ['Store'], summary: 'Buy an item from the store' },
        handler: controller.buyItem
    })

    // SkillTree
    app.get('/skilltrees', {
        schema: { tags: ['Gamification'], summary: 'Get user skill trees' },
        handler: controller.getSkillTree
    })

    // Achievements
    app.get('/achievements', {
        schema: { tags: ['Gamification'], summary: 'Get user achievements' },
        handler: controller.getAchievements
    })

    // Notifications
    app.get('/notifications', {
        schema: { tags: ['Gamification'], summary: 'Get user notifications' },
        handler: controller.getNotifications
    })
    app.delete('/notifications/:id', {
        schema: { tags: ['Gamification'], summary: 'Delete a notification' },
        handler: controller.deleteNotification
    })
}
