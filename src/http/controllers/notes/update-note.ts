import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeUpdateNoteUseCases } from '@/use-cases/factories/make-update-note-use-cases'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function updateNote(request: FastifyRequest, reply: FastifyReply) {
  const noteBodySchema = z.object({
    id: z.string(),
    createdAt: z.coerce.date(),
    description: z.string(),
    equipment_tag: z.string(),
    author: z.string(),
    opportunity: z.number(),
    equipmentId: z.string().nullable().default(null),
    panoramaId: z.string().nullable().default(null),
    coord_x: z.number().nullable().default(null),
    coord_y: z.number().nullable().default(null),
  })

  const data = noteBodySchema.parse(request.body)

  try {
    const createNoteUseCases = makeUpdateNoteUseCases()

    await createNoteUseCases.execute(data)

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
