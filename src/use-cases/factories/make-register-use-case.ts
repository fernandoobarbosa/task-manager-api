import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register.use-case'

export function makeRegisterUseCase() {
  return new RegisterUseCase(new PrismaUsersRepository())
}
