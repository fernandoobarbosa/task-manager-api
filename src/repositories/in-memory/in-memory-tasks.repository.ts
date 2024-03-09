import { Priority, Prisma, Status, Task } from '@prisma/client'
import { TasksRepository } from '../tasks.repository'
import { randomUUID } from 'crypto'

export class InMemoryTasksRepository implements TasksRepository {
  public items: Task[] = []

  async create(data: Prisma.TaskUncheckedCreateInput) {
    const task = {
      id: randomUUID(),
      title: data.title,
      content: data.content,
      status: data.status ?? Status.TODO,
      priority: data.priority ?? Priority.LOW,
      createdAt: new Date(),
      updatedAt: null,
      userId: data.userId ?? randomUUID(),
      deletedAt: null,
    }

    this.items.push(task)

    return task
  }

  async findById(id: string) {
    const task = this.items.find((task) => task.id === id)

    if (!task) {
      return null
    }

    return task
  }
}
