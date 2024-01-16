import { z } from 'zod'
import { makeGetPanoramaUseCases } from '../../../use-cases/factories/make-get-panorama-use-cases'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'

export async function getPanorama(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBodyShema = z.object({ id: z.string() })
  const { id } = requestBodyShema.parse(request.query)

  try {
    const getPanoramaUseCases = makeGetPanoramaUseCases()

    const panorama = await getPanoramaUseCases.execute({ id })

    return reply.status(200).send(panorama)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw Error
  }
}
