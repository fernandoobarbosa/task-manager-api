import { Prisma } from '@prisma/client'
import { TasksRepository } from '../tasks.repository'
import { prisma } from '@/lib/prisma'

export class PrismaTasksRepository implements TasksRepository {
  async create(data: Prisma.TaskUncheckedCreateInput) {
    const task = await prisma.task.create({ data })
    return task
  }

  async findById(id: string) {
    const task = await prisma.task.findUnique({
      where: {
        id,
      },
    })

    return task
  }
}
