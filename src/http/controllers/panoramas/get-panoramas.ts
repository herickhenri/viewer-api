import { makeGetPanoramasUseCases } from '../../../use-cases/factories/make-get-panoramas-use-cases'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getPanoramas(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPanoramasUseCases = makeGetPanoramasUseCases()

  const panoramas = await getPanoramasUseCases.execute()

  return reply.status(200).send(panoramas)
}
