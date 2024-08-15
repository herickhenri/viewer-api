import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { EquipmentAlreadyExistsError } from '../../../use-cases/errors/equipment-already-exists-error'
import { IncorrectlyFormattedTagError } from '../../../use-cases/errors/incorrectly-formatted-tag-error'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeUpdateEquipmentUseCases } from '../../../use-cases/factories/make-update-equipment-use-cases'

type FileFormat = {
  buffer: Buffer
  name: string
  contentType: string
}

export async function updateEquipment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const equipmentsParamsSchema = z.object({
    id: z.string(),
  })

  const photosSchema = z.array(
    z.object({
      link: z.string(),
      key: z.string(),
    }),
  )

  const equipmentBodySchema = z.object({
    tag: z.string().toUpperCase().optional(),
    name: z.string().optional(),
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
    photos: z
      .string()
      .transform((photos) => JSON.parse(photos))
      .pipe(photosSchema)
      .optional(),
  })

  const { id } = equipmentsParamsSchema.parse(request.params)

  const parts = request.parts()
  const json: Record<string, unknown> = {}
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
      json[part.fieldname] = part.value
    }
  }

  const data = equipmentBodySchema.parse({ ...json, files })

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
