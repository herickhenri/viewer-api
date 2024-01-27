import { FastifyRequest, FastifyReply } from 'fastify'
import { makeDeleteAllImagesUseCases } from '@/use-cases/factories/make-delete-all-images-use-cases'
import { z } from 'zod'

export async function deleteAllImages(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteImageParamsSchema = z.object({
    keys: z.array(z.string()),
  })

  const { keys } = deleteImageParamsSchema.parse(request.body)

  const createEquipmentUseCases = makeDeleteAllImagesUseCases()

  await createEquipmentUseCases.execute({ keys })

  return reply.status(204).send()
}
