import Fastify from 'fastify'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'
import fastifyMultipart from '@fastify/multipart'
import cors from '@fastify/cors'

export const app = Fastify()

app.register(cors, {
  origin: true,
  //     !!!!com o "origin: true" qualquer frontend consegue acessar o backend!!!!
})
app.register(fastifyMultipart, {
  limits: {
    files: 10,
    fileSize: 5000000,
  },
})
app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  console.log(error)

  reply.status(500).send({ message: 'Internal server error.' })
})
