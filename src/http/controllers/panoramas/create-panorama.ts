import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeCreatePanoramaUseCases } from '../../../use-cases/factories/make-create-panorama-use-cases'

export async function createPanorama(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const panoramaBodySchema = z.object({
    name: z.string(),
    image_key: z.string(),
    image_link: z.string(),
    gps_x: z.number(),
    gps_y: z.number(),
    markings: z
      .array(
        z.object({
          coord_x: z.number(),
          coord_y: z.number(),
          equipment_id: z.string(),
        }),
      )
      .optional(),
  })

  const data = panoramaBodySchema.parse(request.body)

  const createPanoramaUseCases = makeCreatePanoramaUseCases()

  const panorama = await createPanoramaUseCases.execute(data)

  return reply.status(201).send(panorama)
}
