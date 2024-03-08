import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFindByIdTaskUseCase } from '@/use-cases/factories/make-find-task-by-id.use-case'

export async function findById(request: FastifyRequest, reply: FastifyReply) {
  const routeSchema = z.object({
    id: z.string(),
  })

  const { id } = routeSchema.parse(request.params)

  const findTaskByIdUseCase = await makeFindByIdTaskUseCase()

  const { task } = await findTaskByIdUseCase.execute({
    id,
    userId: request.user.sub,
  })

  return reply.status(200).send(task)
}
