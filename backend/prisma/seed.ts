import { DifficultyEnum, NotificationChannel, PrismaClient } from '../src/generated/prisma/client.js'
import { hashPassword } from '../src/models/utils/hash.js'

const prisma = new PrismaClient(
    { datasources: { db: { url: process.env.DATABASE_URL } } }
)

async function main() {
    console.log('Iniciando o seed atualizado do Project Kaizen...')

    const hashPw = await hashPassword('123456')
    const hashPwLucas = await hashPassword('lucas2004')
    // Criando um usuario e um amigo

    const friend = await prisma.user.create({
        data: {
            username: 'Sensei_Bob',
            email: 'bob@gmail.com',
            passwordHash: hashPw
        }
    })

    const lucas = await prisma.user.create({
        data: {
            username: 'Lucas_Eng',
            email: 'lucas.eng@unifei.edu.br',
            passwordHash: hashPwLucas,
            friends: {
                connect: { id: friend.id } // Estabelecendo a relação N:N de amizade
            },
            avatar: {
                create: { level: 100, currentXP: 1000000, coins: 500000 } // Avatar 1:1
            },
            inventory: {
                create: { capacity: 50 } // Inventory 1:1
            }
        },
        include: { inventory: true }
    })

    // 2. Populando Itens e Achievements (N:N com Inventory)
    const luva = await prisma.item.create({
        data: {
            name: 'Luvas de Venum Impact (14oz)',
            description: 'Garante mais dano nas dailies físicas.',
            rarity: 'EPIC',
            price: 300,
            inventories: { connect: { id: lucas.inventory!.id } }
        }
    })

    const conquista = await prisma.achievement.create({
        data: {
            name: 'Semana Perfeita',
            description: 'Concluiu todos os check-ins.',
            medal: 'GOLD_STAR',
            xpReward: 500,
            unlocked: true,
            unlockedAt: new Date(),
            inventories: { connect: { id: lucas.inventory!.id } }
        }
    })

    // 3. Task / Habit (Hábito como atributo na Task)
    const treinoFisico = await prisma.task.create({
        data: {
            title: 'Treino de Jiu-Jitsu',
            description: 'Treino focado em passagem de guarda.',
            xpReward: 150,
            difficulty: 'HARD',
            userId: lucas.id,
            streak: 5,
            area: 'PHYSICAL',
            lastCheckedIn: new Date()
        }
    })

    // 4. Mission (Herança de Task) e suas Sub-tarefas
    const missionBaseTask = await prisma.task.create({
        data: {
            title: 'Finalizar MVP do Software',
            description: 'Entregar o frontend e backend operantes.',
            xpReward: 300,
            difficulty: 'MEDIUM',
            userId: lucas.id,
            missionBase: {
                create: {
                    coinReward: 100,
                    isDaily: false
                }
            }
        }
    })

    // Conectando uma sub-tarefa à Missão principal
    await prisma.task.create({
        data: {
            title: 'Modelar schema Prisma',
            description: 'Mapear UML para tabelas SQL',
            xpReward: 50,
            userId: lucas.id,
            difficulty: DifficultyEnum.EASY,
            missionId: missionBaseTask.id // Chave estrangeira que liga à Missão
        }
    })

    // 5. SkillTree (Utilizando array de Strings para Nodes)
    await prisma.skillTree.create({
        data: {
            name: 'Engenharia de Software',
            area: 'INTELLECTUAL',
            totalNodes: 15,
            unlockedNodes: ['OOP Basics', 'Design Patterns', 'UML', 'REST APIs'],
            userId: lucas.id
        }
    })

    // 6. Notification
    await prisma.notification.create({
        data: {
            message: 'Sua daily "Treino de Jiu-Jitsu" está pendente!',
            type: 'REMINDER',
            channel: NotificationChannel.WHATSAPP,
            userId: lucas.id
        }
    })

    console.log('Seed do diagrama atualizado concluído com sucesso!')
}
