import fastify from 'fastify'
import { usersRoutes } from '@/http/controllers/users/users.routes'
import { ZodError } from 'zod'
import { env } from './env'
import { fromZodError } from 'zod-validation-error'
import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import { tasksRoutes } from './http/controllers/tasks/tasks.routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(tasksRoutes)

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
