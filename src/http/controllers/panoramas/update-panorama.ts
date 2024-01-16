import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { ResourceNotFoundError } from '../../../use-cases/errors/resource-not-found-error'
import { makeUpdatePanoramaUseCases } from '../../../use-cases/factories/make-update-panorama-use-cases'

export async function updatePanorama(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const PanoramaBodySchema = z.object({
    id: z.string(),
    data: z.object({
      name: z.string().optional(),
      image: z.string().optional(),
      gps_x: z.number().optional(),
      gps_y: z.number().optional(),
      markings: z
        .array(
          z.object({
            coord_x: z.number(),
            coord_y: z.number(),
            equipment_id: z.string(),
          }),
        )
        .optional(),
    }),
  })

  const { id, data } = PanoramaBodySchema.parse(request.body)
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
