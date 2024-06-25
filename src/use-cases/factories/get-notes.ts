import { PrismaNotesRepository } from '@/repositories/prisma/prisma-notes-repository'
import { GetNotesUseCases } from '../repositories/notes/get-notes'

export function makeGetNotesUseCases() {
  const NoteRepository = new PrismaNotesRepository()
  const useCase = new GetNotesUseCases(NoteRepository)

  return useCase
}
