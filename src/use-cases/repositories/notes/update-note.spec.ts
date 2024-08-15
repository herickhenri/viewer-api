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
      created_at: new Date(),
      description: 'Descrição',
      equipment_tag: 'I-1502-BB-200',
      id,
      opportunity: 0,
      equipment_id: null,
    })

    const updatedData = {
      author: 'Jhon updated',
      created_at: new Date(),
      description: 'description updated',
      equipment_tag: 'I-1502-BB-300',
      id,
      opportunity: 0,
      equipment_id: 'newEquipmentId',
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
        created_at: new Date(),
        description: 'Descrição',
        equipment_tag: 'I-1502-BB-200',
        id,
        opportunity: 0,
        equipment_id: null,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
