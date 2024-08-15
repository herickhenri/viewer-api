import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { EquipmentAlreadyExistsError } from '../../../use-cases/errors/equipment-already-exists-error'
import { IncorrectlyFormattedTagError } from '../../../use-cases/errors/incorrectly-formatted-tag-error'
import { makeCreateEquipmentUseCases } from '../../../use-cases/factories/make-create-equipment-use-cases'

type FileFormat = {
  buffer: Buffer
  name: string
  contentType: string
}

export async function createEquipment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const equipmentBodySchema = z.object({
    tag: z.string().toUpperCase(),
    name: z.string().min(1),
    description: z.string().optional(),
    files: z
      .array(
        z.object({
          buffer: z.instanceof(Buffer),
          name: z.string(),
          contentType: z.string(),
        }),
      )
      .optional(),
  })

  const parts = request.parts()
  const json: Record<string, string> = {}
  const files: FileFormat[] = []

  for await (const part of parts) {
    if (part.type === 'file') {
      const image = {
        buffer: await part.toBuffer(),
        name: part.fieldname,
        contentType: part.mimetype,
      }
      files.push(image)
    } else {
      // part.type === 'field'
      json[part.fieldname] = String(part.value)
    }
  }

  const data = equipmentBodySchema.parse({ ...json, files })

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
