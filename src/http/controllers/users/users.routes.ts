import { FastifyInstance } from 'fastify'
import { register } from './register.controller'
import { authenticate } from './authenticate.controller'
import { refresh } from './refresh.controller'
import { verifyJwt } from '@/http/middleware/verify-jwt'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', { onRequest: [verifyJwt] }, register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)
}
