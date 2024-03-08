import { CreateTaskUseCase } from '../create-task.use-case'
import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks.repository'

export function makeCreateTaskUseCase() {
  return new CreateTaskUseCase(new PrismaTasksRepository())
}
