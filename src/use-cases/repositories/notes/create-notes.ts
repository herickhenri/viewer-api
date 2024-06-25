import { Note, NotesRepository } from '@/repositories/notes-repository'
import { NoteAlreadyExistsError } from '@/use-cases/errors/note-already-exists-error'

type createNotesRequest = Note[]

export class CreateNotesUseCases {
  constructor(private notesRepository: NotesRepository) {}

  async execute(notes: createNotesRequest) {
    await Promise.all(
      notes.map(async (note) => {
        const noteAlreadyExist = await this.notesRepository.findById(note.id)

        if (noteAlreadyExist) {
          throw new NoteAlreadyExistsError()
        }
      }),
    )

    await this.notesRepository.createMany(notes)
  }
}
