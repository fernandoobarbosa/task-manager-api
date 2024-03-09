import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks.repository'
import { Priority, Task } from '@prisma/client'
import { ForbiddenError } from './errors/forbidden.error'

interface CreateTaskUseCaseRequest {
  title: string
  content: string
  priority: Priority
  userId: string
  authenticatedUserId: string
}

interface CreateTaskUseCaseResponse {
  task: Task
}

export class CreateTaskUseCase {
  constructor(private tasksRepository: PrismaTasksRepository) {}

  async execute({
    content,
    priority,
    title,
    userId,
    authenticatedUserId,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    if (userId !== authenticatedUserId) {
      throw new ForbiddenError()
    }

    const task = await this.tasksRepository.create({
      content,
      priority,
      title,
      userId,
    })

    return {
      task,
    }
  }
}
