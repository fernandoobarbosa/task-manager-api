import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateTaskUseCase } from '@/use-cases/factories/make-create-task-use-case'
import { Priority } from '@prisma/client'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    title: z.string(),
    content: z.string(),
    priority: z.nativeEnum(Priority),
  })

  const routeSchema = z.object({
    userId: z.string(),
  })

  const { title, content, priority } = registerBodySchema.parse(request.body)

  const { userId } = routeSchema.parse(request.params)

  const createTaskUseCase = makeCreateTaskUseCase()

  const { task } = await createTaskUseCase.execute({
    title,
    content,
    priority,
    userId,
    authenticatedUserId: request.user.sub,
  })

  return reply.status(201).send({ id: task.id })
}
