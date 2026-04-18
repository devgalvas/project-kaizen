import fastify from 'fastify'
import { userRoutes } from './routes/userRoutes'
import { taskRoutes } from './routes/TaskRoutes'

const app = fastify()

app.register(userRoutes)
app.register(taskRoutes)

app.listen({ port: 3000 }).then(() => {
    console.log('🚀 Servidor Kaizen rodando em http://localhost:3000')
})