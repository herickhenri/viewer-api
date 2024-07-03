import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryNotesRepository } from '../../../repositories/in-memory/in-memory-notes-repository'
import { UpdateNoteUseCases } from './update-note'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

let notesRepository: InMemoryNotesRepository
let sut: UpdateNoteUseCases

describe('Update Note Use Case', () => {
  beforeEach(() => {
    notesRepository = new InMemoryNotesRepository()
    sut = new UpdateNoteUseCases(notesRepository)
  })

  it('shoud be able to update note', async () => {
    const id = '12345678'

    await notesRepository.create({
      author: 'Jhon',
      createdAt: new Date(),
      description: 'Descrição',
      equipment_tag: 'I-1502-BB-200',
      id,
      opportunity: 0,
      coord_x: null,
      coord_y: null,
      equipmentId: null,
      panoramaId: null,
    })

    const updatedData = {
      author: 'Jhon updated',
      createdAt: new Date(),
      description: 'description updated',
      equipment_tag: 'I-1502-BB-300',
      id,
      opportunity: 0,
      coord_x: 100,
      coord_y: 100,
      equipmentId: 'newEquipmentId',
      panoramaId: 'newPanoramaId',
    }

    await sut.execute(updatedData)

    const noteFind = await notesRepository.findById(id)

    expect(noteFind).toEqual(updatedData)
  })

  it('shoud not be able update note with an not existing id', async () => {
    const id = 'not exists id'

    await expect(() =>
      sut.execute({
        author: 'Jhon',
        createdAt: new Date(),
        description: 'Descrição',
        equipment_tag: 'I-1502-BB-200',
        id,
        opportunity: 0,
        coord_x: null,
        coord_y: null,
        equipmentId: null,
        panoramaId: null,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
