import { NotesRepository } from '@/repositories/notes-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface getNoteRequest {
  id: string
}

export class GetNoteUseCases {
  constructor(private notesRepository: NotesRepository) {}

  async execute({ id }: getNoteRequest) {
    const note = await this.notesRepository.findById(id)

    if (!note) {
      throw new ResourceNotFoundError()
    }

    return { note }
  }
}
