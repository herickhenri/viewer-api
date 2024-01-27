import { FastifyRequest, FastifyReply } from 'fastify'
import { makeDeleteImageUseCases } from '@/use-cases/factories/make-delete-image-use-cases'
import { z } from 'zod'

export async function deleteImage(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteImageParamsSchema = z.object({
    key: z.string(),
  })

  const { key } = deleteImageParamsSchema.parse(request.params)

  const createEquipmentUseCases = makeDeleteImageUseCases()

  await createEquipmentUseCases.execute({ key })

  return reply.status(204).send()
}
