import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryNotesRepository } from '../../../repositories/in-memory/in-memory-notes-repository'
import { CreateNoteUseCases } from './create-note'
import { NoteAlreadyExistsError } from '@/use-cases/errors/note-already-exists-error'

let notesRepository: InMemoryNotesRepository
let sut: CreateNoteUseCases

describe('Create Note Use Case', () => {
  beforeEach(() => {
    notesRepository = new InMemoryNotesRepository()
    sut = new CreateNoteUseCases(notesRepository)
  })

  it('shoud be able to create note', async () => {
    const id = '12345678'
    await sut.execute({
      author: 'Jhon',
      createdAt: new Date(),
      description: 'Descrição',
      equipment_tag: 'I-1502-BB-200',
      id,
      opportunity: 0,
    })

    const noteFind = await notesRepository.findById(id)

    expect(noteFind?.id).toBe(id)
  })

  it('shoud not be able create note with an existing id', async () => {
    const id = '12345678'

    await sut.execute({
      author: 'Jhon',
      createdAt: new Date(),
      description: 'Descrição',
      equipment_tag: 'I-1502-BB-200',
      id,
      opportunity: 0,
    })

    await expect(() =>
      sut.execute({
        author: 'Jhon',
        createdAt: new Date(),
        description: 'Descrição',
        equipment_tag: 'I-1502-BB-200',
        id,
        opportunity: 0,
      }),
    ).rejects.toBeInstanceOf(NoteAlreadyExistsError)
  })
})
