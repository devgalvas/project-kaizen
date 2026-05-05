// src/server.ts
import fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import fastifyJwt from '@fastify/jwt';
import { userRoutes } from './routes/UserRoute.js';
import { taskRoutes } from './routes/TaskRoute.js';
import { habitRoutes } from './routes/HabitRoute.js';
import { missionRoutes } from './routes/MissionRoute.js';
import { avatarRoutes } from './routes/AvatarRoute.js';
import { dailyRoutes } from './routes/DailyRoute.js';
import { gamificationRoutes } from './routes/GamificationRoute.js';

const app = fastify();

declare module 'fastify' {
    interface FastifyInstance {
        authenticate: any;
    }
}

app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET || 'supersecret_kaizen_key_2026'
});

app.decorate("authenticate", async function (request: any, reply: any) {
    try {
        await request.jwtVerify()
    } catch (err) {
        reply.send(err)
    }
});

// Configuração do Swagger
app.register(swagger, {
    openapi: {
        info: {
            title: 'Project Kaizen API',
            description: 'Documentação do sistema de gamificação Kaizen',
            version: '1.0.0',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{ bearerAuth: [] }],
    },
});

app.register(swaggerUi, {
    routePrefix: '/docs', // A documentação estará em localhost:3000/docs
});

// Registro das rotas
app.register(userRoutes);
app.register(taskRoutes);
app.register(habitRoutes);
app.register(missionRoutes);
app.register(avatarRoutes);
app.register(dailyRoutes);
app.register(gamificationRoutes);

app.listen({ port: 3000 }).then(() => {
    console.log('🚀 Server rodando em http://localhost:3000');
    console.log('📖 Docs em http://localhost:3000/docs');
});