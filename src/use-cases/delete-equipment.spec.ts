import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEquipmentsRepository } from '../repositories/in-memory/in-memory-equipments-repository'
import { DeleteEquipmentUseCases } from './delete-equipment'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let equipmentsRepository: InMemoryEquipmentsRepository
let sut: DeleteEquipmentUseCases

describe('Delete Equipment Use Case', () => {
  beforeEach(() => {
    equipmentsRepository = new InMemoryEquipmentsRepository()
    sut = new DeleteEquipmentUseCases(equipmentsRepository)
  })

  it('shoud be able to delete equipment', async () => {
    const { id } = await equipmentsRepository.create({
      name: 'Bomba de lama',
      tag: 'I-1501-BB-101',
      description: 'Bomba de lama para o LMCD 1',
    })

    await sut.execute({ id })

    const equipment = await equipmentsRepository.findById(id)

    expect(equipment).toBeNull()
  })

  it('shoud not be able to delete non-existing equipment', async () => {
    const id = 'id-not-existing'

    await expect(() => sut.execute({ id })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
