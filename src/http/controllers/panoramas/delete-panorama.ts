import { z } from 'zod'
import { makeDeletePanoramaUseCases } from '../../../use-cases/factories/make-delete-panorama-use-cases'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'

export async function deletePanorama(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBodyShema = z.object({ id: z.string() })
  const { id } = requestBodyShema.parse(request.query)

  try {
    const deletePanoramaUseCases = makeDeletePanoramaUseCases()

    await deletePanoramaUseCases.execute({ id })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw Error
  }
}
