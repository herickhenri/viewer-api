import {
  DeleteMarkupRequest,
  NotesRepository,
} from '@/repositories/notes-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export class DeleteNoteMarkupUseCases {
  constructor(private notesRepository: NotesRepository) {}

  async execute({ note_id, panorama_id }: DeleteMarkupRequest) {
    const note = await this.notesRepository.findById(note_id)

    const markupExist = note?.NotesOnPanoramas?.find(
      (connection) => connection.panorama_id === panorama_id,
    )

    if (!markupExist) {
      throw new ResourceNotFoundError()
    }

    await this.notesRepository.deleteMarkup({ note_id, panorama_id })
  }
}
