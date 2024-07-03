import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetNoteUseCases } from '@/use-cases/factories/make-get-note-use-cases'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function getNote(request: FastifyRequest, reply: FastifyReply) {
  const noteBodySchema = z.object({
    id: z.string(),
  })

  const { id } = noteBodySchema.parse(request.params)

  try {
    const getNoteUseCases = makeGetNoteUseCases()

    const { note } = await getNoteUseCases.execute({ id })

    return reply.status(200).send({ note })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
