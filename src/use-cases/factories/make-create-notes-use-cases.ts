import { PrismaNotesRepository } from '@/repositories/prisma/prisma-notes-repository'
import { CreateNotesUseCases } from '../repositories/notes/create-notes'

export function makeCreateNotesUseCases() {
  const NotesRepository = new PrismaNotesRepository()
  const useCase = new CreateNotesUseCases(NotesRepository)

  return useCase
}
