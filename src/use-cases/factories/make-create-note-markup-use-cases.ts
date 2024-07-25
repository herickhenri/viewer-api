import { PrismaNotesRepository } from '@/repositories/prisma/prisma-notes-repository'
import { CreateNoteMarkupUseCases } from '../repositories/notes/create-note-markup'

export function makeCreateNoteMarkupUseCases() {
  const noteRepository = new PrismaNotesRepository()
  const useCase = new CreateNoteMarkupUseCases(noteRepository)

  return useCase
}
