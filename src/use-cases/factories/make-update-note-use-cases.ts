import { PrismaNotesRepository } from '@/repositories/prisma/prisma-notes-repository'
import { UpdateNoteUseCases } from '../repositories/notes/update-note'

export function makeUpdateNoteUseCases() {
  const NoteRepository = new PrismaNotesRepository()
  const useCase = new UpdateNoteUseCases(NoteRepository)

  return useCase
}
