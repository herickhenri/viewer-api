import { Coordinates, NotesRepository } from '@/repositories/notes-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

type createMarkupRequest = Coordinates

export class CreateNoteMarkupUseCases {
  constructor(private notesRepository: NotesRepository) {}

  async execute(coordinates: createMarkupRequest) {
    const noteAlreadyExist = await this.notesRepository.findById(
      coordinates.note_id,
    )

    if (!noteAlreadyExist) {
      throw new ResourceNotFoundError()
    }

    await this.notesRepository.createMarkup(coordinates)
  }
}
