import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryNotesRepository } from '../../../repositories/in-memory/in-memory-notes-repository'
import { GetNotesUseCases } from './get-notes'

let notesRepository: InMemoryNotesRepository
let sut: GetNotesUseCases

describe('Get Notes Use Case', () => {
  beforeEach(() => {
    notesRepository = new InMemoryNotesRepository()
    sut = new GetNotesUseCases(notesRepository)
  })

  it('shoud be able to get notes', async () => {
    const id = '12345678'
    const noteData = {
      author: 'Jhon',
      createdAt: new Date(),
      description: 'Descrição',
      equipment_tag: 'I-1502-BB-200',
      id,
      opportunity: 0,
    }

    await notesRepository.create(noteData)

    const { notes } = await sut.execute()

    expect(notes).include(noteData)
  })
})
