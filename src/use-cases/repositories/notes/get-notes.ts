import { NotesRepository } from '@/repositories/notes-repository'

export class GetNotesUseCases {
  constructor(private notesRepository: NotesRepository) {}

  async execute() {
    const notes = await this.notesRepository.findMany()

    return { notes }
  }
}
