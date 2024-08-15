import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEquipmentsRepository } from '../../../repositories/in-memory/in-memory-equipments-repository'
import { DeleteEquipmentUseCases } from './delete-equipment'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { createEquipment } from '@/utils/test/create-equipment'
import { LocalImagesStorage } from '@/storage/local/local-images-storage'

let equipmentsRepository: InMemoryEquipmentsRepository
let imagesStorage: LocalImagesStorage
let sut: DeleteEquipmentUseCases

describe('Delete Equipment Use Case', () => {
  beforeEach(() => {
    equipmentsRepository = new InMemoryEquipmentsRepository()
    imagesStorage = new LocalImagesStorage()
    sut = new DeleteEquipmentUseCases(equipmentsRepository, imagesStorage)
  })

  it('shoud be able to delete equipment', async () => {
    const { id } = await createEquipment({
      equipmentsRepository,
      imagesStorage,
      isToCreateImage: true,
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
