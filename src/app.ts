import fastify from 'fastify'
import { usersRoutes } from './controllers/users/users.routes'
import { ZodError } from 'zod'
import { env } from './env'
import { fromZodError } from 'zod-validation-error'

export const app = fastify()

app.register(usersRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: fromZodError(error) })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
