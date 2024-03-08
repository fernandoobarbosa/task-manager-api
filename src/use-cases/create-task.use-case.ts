import { PrismaTasksRepository } from '@/repositories/prisma/prisma-tasks.repository'
import { Priority, Task } from '@prisma/client'

interface CreateTaskUseCaseRequest {
  title: string
  content: string
  priority: Priority
  userId: string
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
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
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
