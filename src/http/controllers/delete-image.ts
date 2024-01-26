import { FastifyRequest, FastifyReply } from 'fastify'
import { makeDeleteImageUseCases } from '@/use-cases/factories/make-delete-image-use-cases'
import { z } from 'zod'

export async function deleteImage(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const deleteImageBodySchema = z.object({
    key: z.string(),
  })

  const { key } = deleteImageBodySchema.parse(request.body)

  const createEquipmentUseCases = makeDeleteImageUseCases()

  await createEquipmentUseCases.execute({ key })

  return reply.status(204).send()
}
