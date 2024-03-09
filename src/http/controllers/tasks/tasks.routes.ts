import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { verifyJwt } from '@/http/middleware/verify-jwt'
import { findById } from './find-by-id.controller'

export async function tasksRoutes(app: FastifyInstance) {
  app.post('/users/:userId/tasks', { onRequest: [verifyJwt] }, create)
  app.get('/users/:userId/tasks/:taskId', { onRequest: [verifyJwt] }, findById)
}
