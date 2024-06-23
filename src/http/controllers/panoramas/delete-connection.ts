import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeDeleteConnectionUseCases } from '@/use-cases/factories/make-delete-connection-use-cases'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function deleteConnection(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const connectionBodySchema = z.object({
    panorama_connect_id: z.string(),
    panorama_id: z.string(),
  })

  const data = connectionBodySchema.parse(request.body)

  try {
    const deleteConnectionUseCases = makeDeleteConnectionUseCases()

    await deleteConnectionUseCases.execute(data)

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw Error
  }
}
