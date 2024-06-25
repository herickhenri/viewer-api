import { NoteAlreadyExistsError } from '@/use-cases/errors/note-already-exists-error'
import { makeCreateNotesUseCases } from '@/use-cases/factories/make-create-notes-use-cases'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function createNotes(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const notesBodySchema = z.array(
    z.object({
      id: z.string(),
      createdAt: z.coerce.date(),
      description: z.string(),
      equipment_tag: z.string(),
      author: z.string(),
      opportunity: z.number(),
      equipmentId: z.string().nullable().default(null),
    }),
  )

  const data = notesBodySchema.parse(request.body)

  try {
    const createNotesUseCases = makeCreateNotesUseCases()

    await createNotesUseCases.execute(data)

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof NoteAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
