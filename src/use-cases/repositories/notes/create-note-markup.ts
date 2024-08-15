import {
  NotesOnPanoramasInput,
  NotesRepository,
} from '@/repositories/notes-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

type createMarkupRequest = NotesOnPanoramasInput

export class CreateNoteMarkupUseCases {
  constructor(private notesRepository: NotesRepository) {}

  async execute(input: createMarkupRequest) {
    const noteAlreadyExist = await this.notesRepository.findById(input.note_id)

    if (!noteAlreadyExist) {
      throw new ResourceNotFoundError()
    }

    await this.notesRepository.createMarkup(input)
  }
}
