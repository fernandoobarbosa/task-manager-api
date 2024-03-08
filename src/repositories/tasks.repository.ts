import { Prisma, Task } from '@prisma/client'

export interface FindByIdParams {
  id: string
  userId: string
}

export interface TasksRepository {
  create(data: Prisma.TaskUncheckedCreateInput): Promise<Task>
  findById(params: FindByIdParams): Promise<Task | null>
}
