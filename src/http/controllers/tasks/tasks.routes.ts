import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { verifyJwt } from '@/http/middleware/verify-jwt'

export async function tasksRoutes(app: FastifyInstance) {
  app.post('/tasks', { onRequest: [verifyJwt] }, create)
}
