import { PrismaNotesRepository } from '@/repositories/prisma/prisma-notes-repository'
import { CreateNoteUseCases } from '../repositories/notes/create-note'

export function makeCreateNoteUseCases() {
  const NoteRepository = new PrismaNotesRepository()
  const useCase = new CreateNoteUseCases(NoteRepository)

  return useCase
}
