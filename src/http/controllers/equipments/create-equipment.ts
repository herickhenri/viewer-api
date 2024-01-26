import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { EquipmentAlreadyExistsError } from '../../../use-cases/errors/equipment-already-exists-error'
import { IncorrectlyFormattedTagError } from '../../../use-cases/errors/incorrectly-formatted-tag-error'
import { makeCreateEquipmentUseCases } from '../../../use-cases/factories/make-create-equipment-use-cases'

export async function createEquipment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const equipmentBodySchema = z.object({
    tag: z.string().toUpperCase(),
    name: z.string(),
    description: z.string().optional(),
    photos: z
      .array(
        z.object({
          key: z.string(),
          link: z.string(),
        }),
      )
      .optional(),
  })

  const data = equipmentBodySchema.parse(request.body)

  try {
    const createEquipmentUseCases = makeCreateEquipmentUseCases()

    const equipment = await createEquipmentUseCases.execute(data)

    return reply.status(201).send(equipment)
  } catch (err) {
    if (err instanceof EquipmentAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    if (err instanceof IncorrectlyFormattedTagError) {
      return reply.status(422).send({ message: err.message })
    }

    throw err
  }
}
