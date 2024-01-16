import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { EquipmentAlreadyExistsError } from '../../../use-cases/errors/equipment-already-exists-error'
import { IncorrectlyFormattedTagError } from '../../../use-cases/errors/incorrectly-formatted-tag-error'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeUpdateEquipmentUseCases } from '../../../use-cases/factories/make-update-equipment-use-cases'

export async function updateEquipment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const equipmentBodySchema = z.object({
    id: z.string(),
    data: z.object({
      tag: z.string().toUpperCase().optional(),
      name: z.string().optional(),
      description: z.string().optional(),
      photos: z.array(z.string()).optional(),
    }),
  })

  const { id, data } = equipmentBodySchema.parse(request.body)
  try {
    const updateEquipmentUseCases = makeUpdateEquipmentUseCases()

    const equipment = await updateEquipmentUseCases.execute({ id, data })

    return reply.status(200).send(equipment)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
    if (err instanceof EquipmentAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    if (err instanceof IncorrectlyFormattedTagError) {
      return reply.status(422).send({ message: err.message })
    }

    throw err
  }
}
