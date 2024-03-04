import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEquipmentsRepository } from '../../../repositories/in-memory/in-memory-equipments-repository'
import { GetEquipmentsUseCases } from './get-equipments'
import { createEquipment } from '@/utils/test/create-equipment'

let equipmentsRepository: InMemoryEquipmentsRepository
let sut: GetEquipmentsUseCases

describe('Get Equipments Use Case', () => {
  beforeEach(() => {
    equipmentsRepository = new InMemoryEquipmentsRepository()
    sut = new GetEquipmentsUseCases(equipmentsRepository)
  })

  it('shoud be able to get all equipments', async () => {
    const { id } = await createEquipment({ equipmentsRepository })

    const { equipments } = await sut.execute({ ids: [id] })

    expect(equipments).toBeTruthy()
    expect(equipments.length).toEqual(1)
  })
})
