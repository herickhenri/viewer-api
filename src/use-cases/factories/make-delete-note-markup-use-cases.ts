import { PrismaNotesRepository } from '@/repositories/prisma/prisma-notes-repository'
import { DeleteNoteMarkupUseCases } from '../repositories/notes/delete-note-markup'

export function makeDeleteNoteMarkupUseCases() {
  const noteRepository = new PrismaNotesRepository()
  const useCase = new DeleteNoteMarkupUseCases(noteRepository)

  return useCase
}
