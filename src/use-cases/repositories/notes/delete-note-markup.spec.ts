import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryNotesRepository } from '../../../repositories/in-memory/in-memory-notes-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { DeleteNoteMarkupUseCases } from './delete-note-markup'
import { Note } from '@/repositories/notes-repository'

let notesRepository: InMemoryNotesRepository
let sut: DeleteNoteMarkupUseCases

describe('Delete Note Markup Use Case', () => {
  beforeEach(() => {
    notesRepository = new InMemoryNotesRepository()
    sut = new DeleteNoteMarkupUseCases(notesRepository)
  })

  it('shoud be able to delete markup', async () => {
    const id = '12345678'
    let noteFind: Note | null

    const connection = {
      yaw: 100,
      pitch: 100,
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

    await notesRepository.createMarkup({
      note_id: id,
      ...connection,
    })

    noteFind = await notesRepository.findById(id)

    expect(noteFind?.panoramas).toStrictEqual([connection])

    await sut.execute({ note_id: id, panorama_id: connection.panorama_id })
    noteFind = await notesRepository.findById(id)

    expect(noteFind?.panoramas).toEqual([])
  })

  it('shoud not be able delete markup with not existing', async () => {
    await expect(() =>
      sut.execute({
        note_id: 'not-exist-note-id',
        panorama_id: 'not-exist-panorama-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('shoud not be able to delete just one markup', async () => {
    const id = '12345678'
    let noteFind: Note | null

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
      yaw: 100,
      pitch: 100,
      panorama_id: 'first_panorama_id',
    }
    const secondConnection = {
      yaw: 100,
      pitch: 100,
      panorama_id: 'second_panorama_id',
    }

    await notesRepository.createMarkup({
      note_id: id,
      ...firstConnection,
    })

    await notesRepository.createMarkup({
      note_id: id,
      ...secondConnection,
    })

    noteFind = await notesRepository.findById(id)

    expect(noteFind?.panoramas).toContainEqual(firstConnection)
    expect(noteFind?.panoramas).toContainEqual(secondConnection)

    await sut.execute({
      note_id: id,
      panorama_id: secondConnection.panorama_id,
    })

    noteFind = await notesRepository.findById(id)

    expect(noteFind?.panoramas).toEqual([firstConnection])
  })
})
