import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { AuthenticateUseCase } from '../authenticate.use-case'

export function makeAuthenticateUseCase() {
  return new AuthenticateUseCase(new PrismaUsersRepository())
}
