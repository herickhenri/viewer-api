import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryNotesRepository } from '../../../repositories/in-memory/in-memory-notes-repository'
import { CreateNoteMarkupUseCases } from './create-note-markup'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

let notesRepository: InMemoryNotesRepository
let sut: CreateNoteMarkupUseCases

describe('Create Note Markup Use Case', () => {
  beforeEach(() => {
    notesRepository = new InMemoryNotesRepository()
    sut = new CreateNoteMarkupUseCases(notesRepository)
  })

  it('shoud be able to create markup', async () => {
    const id = '12345678'
    const connection = {
      coord_x: 100,
      coord_y: 100,
      panorama_id: 'panorama_id',
    }

    await notesRepository.create({
      author: 'Jhon',
      created_at: new Date(),
      description: 'Descrição',
      equipment_tag: 'I-1502-BB-200',
      id,
      opportunity: 0,
      equipment_id: null,
    })

    await sut.execute({
      note_id: id,
      ...connection,
    })

    const noteFind = await notesRepository.findById(id)

    expect(noteFind?.panoramas).toStrictEqual([connection])
  })

  it('shoud not be able create markup with not existing id', async () => {
    await expect(() =>
      sut.execute({
        note_id: 'no-exist-id',
        coord_x: 100,
        coord_y: 100,
        panorama_id: 'panorama_id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('shoud not be able to create more than one markup', async () => {
    const id = '12345678'

    await notesRepository.create({
      author: 'Jhon',
      created_at: new Date(),
      description: 'Descrição',
      equipment_tag: 'I-1502-BB-200',
      id,
      opportunity: 0,
      equipment_id: null,
    })

    const firstConnection = {
      coord_x: 100,
      coord_y: 100,
      panorama_id: 'first_panorama_id',
    }
    const secondConnection = {
      coord_x: 100,
      coord_y: 100,
      panorama_id: 'second_panorama_id',
    }

    await sut.execute({
      note_id: id,
      ...firstConnection,
    })

    await sut.execute({
      note_id: id,
      ...secondConnection,
    })

    const noteFind = await notesRepository.findById(id)

    expect(noteFind?.panoramas).toContainEqual(firstConnection)
    expect(noteFind?.panoramas).toContainEqual(secondConnection)
  })
})
