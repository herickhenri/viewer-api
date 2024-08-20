import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreateConnectionUseCases } from '@/use-cases/factories/make-create-connection-use-cases'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function createConnection(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const connectionSchema = z.object({
    yaw: z.number(),
    pitch: z.number(),
    connected_from_id: z.string(),
    connected_to_id: z.string(),
  })
  const panoramaBodySchema = z.object({
    connections: z.tuple([connectionSchema, connectionSchema]),
  })
  const data = panoramaBodySchema.parse(request.body)

  try {
    const createConnectionUseCases = makeCreateConnectionUseCases()

    await createConnectionUseCases.execute(data)

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw Error
  }
}
