import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks.repository'
import { Task } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { ForbiddenError } from './errors/forbidden.error'

interface FindTaskByIdUseCaseRequest {
  taskId: string
  userId: string
  authenticatedUserId: string
}

interface FindTaskByIdUseCaseResponse {
  task: Task
}

export class FindTaskByIdUseCase {
  constructor(private tasksRepository: PrismaTasksRepository) {}

  async execute({
    taskId,
    userId,
    authenticatedUserId,
  }: FindTaskByIdUseCaseRequest): Promise<FindTaskByIdUseCaseResponse> {
    if (userId !== authenticatedUserId) {
      throw new ForbiddenError()
    }

    const task = await this.tasksRepository.findById(taskId)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    return {
      task,
    }
  }
}
