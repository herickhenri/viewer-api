import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeDeleteNoteMarkupUseCases } from '@/use-cases/factories/make-delete-note-markup-use-cases'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function deleteNoteMarkup(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const markupBodySchema = z.object({
    panorama_id: z.string(),
    note_id: z.string(),
  })

  const data = markupBodySchema.parse(request.body)

  try {
    const deleteNoteMarkupUseCases = makeDeleteNoteMarkupUseCases()

    await deleteNoteMarkupUseCases.execute(data)

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
