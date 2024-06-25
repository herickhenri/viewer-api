import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetNotesUseCases } from '@/use-cases/factories/get-notes'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getNotes(request: FastifyRequest, reply: FastifyReply) {
  try {
    const getNotesUseCases = makeGetNotesUseCases()

    const { notes } = await getNotesUseCases.execute()

    return reply.status(200).send({ notes })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    throw err
  }
}
