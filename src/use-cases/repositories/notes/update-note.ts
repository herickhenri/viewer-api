import { Note, NotesRepository } from '@/repositories/notes-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

type updateNoteRequest = Note

export class UpdateNoteUseCases {
  constructor(private notesRepository: NotesRepository) {}

  async execute(updatedNote: updateNoteRequest) {
    const noteAlreadyExist = await this.notesRepository.findById(updatedNote.id)

    if (!noteAlreadyExist) {
      throw new ResourceNotFoundError()
    }

    await this.notesRepository.update(updatedNote)
  }
}
