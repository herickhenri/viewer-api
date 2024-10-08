import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryNotesRepository } from '../../../repositories/in-memory/in-memory-notes-repository'
import { GetNoteUseCases } from './get-note'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

let notesRepository: InMemoryNotesRepository
let sut: GetNoteUseCases

describe('Get Note Use Case', () => {
  beforeEach(() => {
    notesRepository = new InMemoryNotesRepository()
    sut = new GetNoteUseCases(notesRepository)
  })

  it('shoud be able to get note', async () => {
    const id = '12345678'
    const noteData = {
      author: 'Jhon',
      created_at: new Date(),
      description: 'Descrição',
      equipment_tag: 'I-1502-BB-200',
      id,
      opportunity: 0,
      coord_x: null,
      coord_y: null,
      equipment_id: null,
      panoramaId: null,
    }

    await notesRepository.create(noteData)

    const { note } = await sut.execute({ id })

    expect(note).toBe(noteData)
  })

  it('shoud not be able get note with an existing id', async () => {
    const id = 'id-not-existing'

    await expect(() => sut.execute({ id })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
