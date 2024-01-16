import { z } from 'zod'
import { makeGetEquipmentUseCases } from '../../../use-cases/factories/make-get-equipment-use-cases'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'

export async function getEquipment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBodyShema = z.object({ id: z.string() })
  const { id } = requestBodyShema.parse(request.query)

  try {
    const getEquipmentUseCases = makeGetEquipmentUseCases()

    const equipment = await getEquipmentUseCases.execute({ id })

    return reply.status(200).send(equipment)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw Error
  }
}
