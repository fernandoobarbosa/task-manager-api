import { it, describe, beforeEach, expect } from 'vitest'
import { FindTaskByIdUseCase } from './find-task-by-id.use.case'
import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks.repository'
import { randomUUID } from 'node:crypto'
import { Priority } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { ForbiddenError } from './errors/forbidden.error'

let tasksRepository: InMemoryTasksRepository
let sut: FindTaskByIdUseCase

describe('Find Task By Id Use Case', () => {
  beforeEach(() => {
    tasksRepository = new InMemoryTasksRepository()
    sut = new FindTaskByIdUseCase(tasksRepository)
  })
  it('should be able to return a task by id', async () => {
    const userId = randomUUID()

    const createdTask = await tasksRepository.create({
      userId,
      title: 'Titulo da task',
      content: 'Conteudo da task',
      priority: Priority.MEDIUM,
    })

    const { task } = await sut.execute({
      taskId: createdTask.id,
      userId,
      authenticatedUserId: userId,
    })

    expect(task.id).toEqual(createdTask.id)
    expect(task.userId).toEqual(userId)
  })
  it('should not be able to return a task with a non-existing id', async () => {
    const userId = randomUUID()
    await expect(
      sut.execute({
        taskId: randomUUID(),
        userId,
        authenticatedUserId: userId,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
  it('should not be able to return a task with a wrong userId', async () => {
    const createdTask = await tasksRepository.create({
      userId: randomUUID(),
      title: 'Titulo da task',
      content: 'Conteudo da task',
      priority: Priority.MEDIUM,
    })

    await expect(
      sut.execute({
        taskId: createdTask.id,
        userId: randomUUID(),
        authenticatedUserId: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(ForbiddenError)
  })
})
