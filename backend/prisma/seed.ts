import { prisma } from '../lib/prisma.js'
import { hashPassword } from '../src/models/utils/hash.js'

async function main() {
    console.log('Iniciando o seed atualizado do Project Kaizen...')

    const hashPwLucas = await hashPassword('lucas2004')

    const lucas = await prisma.user.create({
        data: {
            email: 'lucas.eng@unifei.edu.br',
            passwordHash: hashPwLucas,
            avatar: {
                create: { level: 100, currentXP: 1000000, coins: 500000 } // Avatar 1:1
            }
        },
        include: { avatar: true }
    })

    const rewardStore = await prisma.rewardStore.create({
        data: {}
    })

    const luva = await prisma.item.create({
        data: {
            name: 'Luvas de Venum Impact (14oz)',
            price: 300,
            rarity: 'EPIC',
            rewardStoreId: rewardStore.id
        }
    })

    const conquista = await prisma.achievement.create({
        data: {
            criteria: 'Concluiu todos os check-ins.',
            isUnlocked: true,
            avatarId: lucas.avatar!.id
        }
    })

    const treinoFisico = await prisma.task.create({
        data: {
            title: 'Treino de Jiu-Jitsu',
            description: 'Treino focado em passagem de guarda.',
            xpReward: 150,
            userId: lucas.id,
            habit: {
                create: {
                    streak: 5,
                    frequency: 'DAILY'
                }
            }
        }
    })

    const missionTask = await prisma.task.create({
        data: {
            title: 'Finalizar MVP do Software',
            description: 'Entregar o frontend e backend operantes.',
            xpReward: 300,
            userId: lucas.id,
            mission: {
                create: {
                    coinReward: 100,
                    isDaily: false
                }
            }
        }
    })

    await prisma.skillTree.create({
        data: {
            category: 'Engenharia de Software',
            nodes: ['OOP Basics', 'Design Patterns', 'UML', 'REST APIs'],
            avatarId: lucas.avatar!.id
        }
    })

    await prisma.notification.create({
        data: {
            message: 'Sua daily "Treino de Jiu-Jitsu" está pendente!',
            userId: lucas.id
        }
    })

    console.log('Seed do diagrama atualizado concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
