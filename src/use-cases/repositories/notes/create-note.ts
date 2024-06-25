import { Note, NotesRepository } from '@/repositories/notes-repository'
import { NoteAlreadyExistsError } from '@/use-cases/errors/note-already-exists-error'

type createNoteRequest = Note

export class CreateNoteUseCases {
  constructor(private notesRepository: NotesRepository) {}

  async execute(note: createNoteRequest) {
    const noteAlreadyExist = await this.notesRepository.findById(note.id)

    if (noteAlreadyExist) {
      throw new NoteAlreadyExistsError()
    }

    await this.notesRepository.create(note)
  }
}
