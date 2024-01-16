import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEquipmentsRepository } from '../repositories/in-memory/in-memory-equipments-repository'
import { GetEquipmentsUseCases } from './get-equipments'

let equipmentsRepository: InMemoryEquipmentsRepository
let sut: GetEquipmentsUseCases

describe('Get Equipments Use Case', () => {
  beforeEach(() => {
    equipmentsRepository = new InMemoryEquipmentsRepository()
    sut = new GetEquipmentsUseCases(equipmentsRepository)
  })

  it('shoud be able to get equipments', async () => {
    await equipmentsRepository.create({
      name: 'Bomba de lama',
      tag: 'I-1501-BB-101',
      description: 'Bomba de lama para o LMCD 1',
    })

    const { equipments } = await sut.execute()

    expect(equipments).toBeTruthy()
  })
})
