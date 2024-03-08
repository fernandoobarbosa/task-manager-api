import { Prisma } from '@prisma/client'
import { FindByIdParams, TasksRepository } from '../tasks.repository'
import { prisma } from '@/lib/prisma'

export class PrismaTasksRepository implements TasksRepository {
  async create(data: Prisma.TaskUncheckedCreateInput) {
    const task = await prisma.task.create({ data })
    return task
  }

  async findById(params: FindByIdParams) {
    const task = await prisma.task.findUnique({
      where: {
        id: params.id,
        AND: {
          userId: params.userId,
        },
      },
    })

    return task
  }
}
