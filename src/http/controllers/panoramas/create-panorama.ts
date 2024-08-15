import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreatePanoramaUseCases } from '../../../use-cases/factories/make-create-panorama-use-cases'

type FileFormat = {
  buffer: Buffer
  contentType: string
}

export async function createPanorama(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const equipmentsSchema = z.array(
    z.object({
      coord_x: z.number(),
      coord_y: z.number(),
      equipment_id: z.string(),
    }),
  )
  const linksSchema = z.array(
    z.object({
      coord_x: z.number(),
      coord_y: z.number(),
      panorama_connect_id: z.string(),
    }),
  )

  const panoramaBodySchema = z.object({
    name: z.string(),
    file: z.object({
      buffer: z.instanceof(Buffer),
      contentType: z.string(),
    }),
    equipments: z
      .string()
      .transform((json) => JSON.parse(json))
      .pipe(equipmentsSchema)
      .optional(),
    links: z
      .string()
      .transform((json) => JSON.parse(json))
      .pipe(linksSchema)
      .optional(),
  })

  const parts = request.parts()
  const json: Record<string, unknown> = {}
  let file: FileFormat = {} as FileFormat

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

  const createPanoramaUseCases = makeCreatePanoramaUseCases()

  const panorama = await createPanoramaUseCases.execute(data)

  return reply.status(201).send(panorama)
}
