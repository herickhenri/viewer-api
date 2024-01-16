import { z } from 'zod'
import { makeDeleteEquipmentUseCases } from '../../../use-cases/factories/make-delete-equipment-use-cases'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'

export async function deleteEquipment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBodyShema = z.object({ id: z.string() })
  const { id } = requestBodyShema.parse(request.query)

  try {
    const deleteEquipmentUseCases = makeDeleteEquipmentUseCases()

    await deleteEquipmentUseCases.execute({ id })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw Error
  }
}
