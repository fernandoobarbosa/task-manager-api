import { hash } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryTasksRepository } from '@/repositories/in-memory/in-memory-tasks.repository'
import { CreateTaskUseCase } from './create-task.use-case'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository'
import { Priority, Status } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { ForbiddenError } from './errors/forbidden.error'

let usersRepository: InMemoryUsersRepository
let tasksRepository: InMemoryTasksRepository
let sut: CreateTaskUseCase

describe('Create Task Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    tasksRepository = new InMemoryTasksRepository()
    sut = new CreateTaskUseCase(tasksRepository)
  })

  it('should be able to create a task', async () => {
    const user = await usersRepository.create({
      name: 'John doe',
      email: 'johndoe@email.com',
      password: await hash('123456', 6),
    })

    const { task } = await sut.execute({
      userId: user.id,
      title: 'Titulo da task',
      content: 'Conteudo da task',
      priority: Priority.MEDIUM,
      authenticatedUserId: user.id,
    })

    expect(task.id).toEqual(expect.any(String))
    expect(task.userId).toEqual(user.id)
    expect(task.priority).toEqual(Priority.MEDIUM)
    expect(task.status).toEqual(Status.TODO)
  })

  it('should not be able to create a task with wrong user', async () => {
    const user = await usersRepository.create({
      name: 'John doe',
      email: 'johndoe@email.com',
      password: await hash('123456', 6),
    })

    await expect(
      sut.execute({
        userId: user.id,
        title: 'Titulo da task',
        content: 'Conteudo da task',
        priority: Priority.MEDIUM,
        authenticatedUserId: randomUUID(),
      }),
    ).rejects.toBeInstanceOf(ForbiddenError)
  })
})
