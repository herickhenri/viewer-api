import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEquipmentsRepository } from '../../../repositories/in-memory/in-memory-equipments-repository'
import { GetAllEquipmentsUseCases } from './get-all-equipments'
import { createEquipment } from '@/utils/test/create-equipment'

let equipmentsRepository: InMemoryEquipmentsRepository
let sut: GetAllEquipmentsUseCases

describe('Get Equipments Use Case', () => {
  beforeEach(() => {
    equipmentsRepository = new InMemoryEquipmentsRepository()
    sut = new GetAllEquipmentsUseCases(equipmentsRepository)
  })

  it('shoud be able to get all equipments', async () => {
    await createEquipment({ equipmentsRepository })

    const { equipments } = await sut.execute()

    expect(equipments).toBeTruthy()
  })
})
