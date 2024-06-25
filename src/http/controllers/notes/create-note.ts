import { NoteAlreadyExistsError } from '@/use-cases/errors/note-already-exists-error'
import { makeCreateNoteUseCases } from '@/use-cases/factories/make-create-note-use-cases'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createNote(request: FastifyRequest, reply: FastifyReply) {
  const noteBodySchema = z.object({
    id: z.string(),
    createdAt: z.coerce.date(),
    description: z.string(),
    equipment_tag: z.string(),
    author: z.string(),
    opportunity: z.number(),
  })

  const data = noteBodySchema.parse(request.body)

  try {
    const createNoteUseCases = makeCreateNoteUseCases()

    await createNoteUseCases.execute(data)

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof NoteAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
