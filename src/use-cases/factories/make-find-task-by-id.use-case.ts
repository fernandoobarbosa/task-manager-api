import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks.repository'
import { FindTaskByIdUseCase } from '../find-task-by-id.use.case'

export function makeFindByIdTaskUseCase() {
  return new FindTaskByIdUseCase(new PrismaTasksRepository())
}
