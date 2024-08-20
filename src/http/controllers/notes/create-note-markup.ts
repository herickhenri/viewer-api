import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeCreateNoteMarkupUseCases } from '@/use-cases/factories/make-create-note-markup-use-cases'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createNoteMarkup(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const markupBodySchema = z.object({
    panorama_id: z.string(),
    note_id: z.string(),
    yaw: z.number(),
    pitch: z.number(),
  })

  const data = markupBodySchema.parse(request.body)

  try {
    const createNoteMarkupUseCases = makeCreateNoteMarkupUseCases()

    await createNoteMarkupUseCases.execute(data)

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
