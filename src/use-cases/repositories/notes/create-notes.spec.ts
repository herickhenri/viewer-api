import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryNotesRepository } from '../../../repositories/in-memory/in-memory-notes-repository'
import { CreateNotesUseCases } from './create-notes'
import { NoteAlreadyExistsError } from '@/use-cases/errors/note-already-exists-error'

let notesRepository: InMemoryNotesRepository
let sut: CreateNotesUseCases

describe('Create Notes Use Case', () => {
  beforeEach(() => {
    notesRepository = new InMemoryNotesRepository()
    sut = new CreateNotesUseCases(notesRepository)
  })

  it('shoud be able to create notes', async () => {
    const notes = [
      {
        author: 'Jhon',
        createdAt: new Date(),
        description: 'Descrição',
        equipment_tag: 'I-1502-BB-200',
        id: '12345678',
        opportunity: 0,
        equipmentId: null,
      },
    ]
    await sut.execute(notes)

    const notesFind = await notesRepository.findMany()

    expect(notesFind).toEqual(notes)
  })

  it('shoud not be able create notes with an existing id', async () => {
    const id = '12345678'

    const noteData = {
      author: 'Jhon',
      createdAt: new Date(),
      description: 'Descrição',
      equipment_tag: 'I-1502-BB-200',
      id,
      opportunity: 0,
      equipmentId: null,
    }

    await notesRepository.create(noteData)

    await expect(() => sut.execute([noteData])).rejects.toBeInstanceOf(
      NoteAlreadyExistsError,
    )
  })
})
