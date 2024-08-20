import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeUpdatePanoramaUseCases } from '../../../use-cases/factories/make-update-panorama-use-cases'

type FileFormat = {
  buffer: Buffer
  contentType: string
}

export async function updatePanorama(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const panoramaParamsSchema = z.object({
    id: z.string(),
  })
  const equipmentsSchema = z.array(
    z.object({
      yaw: z.number(),
      pitch: z.number(),
      equipment_id: z.string(),
    }),
  )
  const panoramaBodySchema = z.object({
    name: z.string().optional(),
    file: z
      .object({
        buffer: z.instanceof(Buffer),
        contentType: z.string(),
      })
      .optional(),
    equipments: z
      .string()
      .transform((json) => JSON.parse(json))
      .pipe(equipmentsSchema)
      .optional(),
  })

  const parts = request.parts()
  const json: Record<string, unknown> = {}
  let file: FileFormat | undefined

  for await (const part of parts) {
    if (part.type === 'file') {
      const image = {
        buffer: await part.toBuffer(),
        contentType: part.mimetype,
      }
      file = image
    } else {
      // part.type === 'field'
      json[part.fieldname] = part.value
    }
  }

  const data = panoramaBodySchema.parse({ ...json, file })
  const { id } = panoramaParamsSchema.parse(request.params)

  try {
    const updatePanoramaUseCases = makeUpdatePanoramaUseCases()

    const panorama = await updatePanoramaUseCases.execute({ data, id })
    return reply.status(200).send(panorama)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
    throw err
  }
}
