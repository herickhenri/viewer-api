import { PrismaNotesRepository } from '@/repositories/prisma/prisma-notes-repository'
import { GetNoteUseCases } from '../repositories/notes/get-note'

export function makeGetNoteUseCases() {
  const NoteRepository = new PrismaNotesRepository()
  const useCase = new GetNoteUseCases(NoteRepository)

  return useCase
}
