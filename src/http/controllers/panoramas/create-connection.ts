import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateConnectionUseCases } from '@/use-cases/factories/make-create-connection-use-cases'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function createConnection(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const linkSchema = z.object({
    panorama_connect_id: z.string(),
    panorama_id: z.string(),
    coord_x: z.number(),
    coord_y: z.number(),
  })
  const panoramaBodySchema = z.object({
    connection: z.tuple([linkSchema, linkSchema]),
  })
  const data = panoramaBodySchema.parse(request.body)

  try {
    const createConnectionUseCases = makeCreateConnectionUseCases()

    await createConnectionUseCases.execute(data.connection)

    return reply.status(201)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw Error
  }
}
