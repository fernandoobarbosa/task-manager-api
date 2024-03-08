import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks.repository'
import { Task } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found.error'

interface FindTaskByIdUseCaseRequest {
  id: string
  userId: string
}

interface FindTaskByIdUseCaseResponse {
  task: Task
}

export class FindTaskByIdUseCase {
  constructor(private tasksRepository: PrismaTasksRepository) {}

  async execute({
    id,
    userId,
  }: FindTaskByIdUseCaseRequest): Promise<FindTaskByIdUseCaseResponse> {
    console.log(userId)
    const task = await this.tasksRepository.findById({
      id,
      userId,
    })

    console.log(task)

    if (!task) {
      throw new ResourceNotFoundError()
    }

    return {
      task,
    }
  }
}
