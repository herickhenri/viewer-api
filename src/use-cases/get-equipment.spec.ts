import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEquipmentsRepository } from '../repositories/in-memory/in-memory-equipments-repository'
import { GetEquipmentUseCases } from './get-equipment'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let equipmentsRepository: InMemoryEquipmentsRepository
let sut: GetEquipmentUseCases

describe('Get Equipment Use Case', () => {
  beforeEach(() => {
    equipmentsRepository = new InMemoryEquipmentsRepository()
    sut = new GetEquipmentUseCases(equipmentsRepository)
  })

  it('shoud be able to get equipment by id', async () => {
    const data = {
      name: 'Bomba de lama',
      tag: 'I-1501-BB-101',
      description: 'Bomba de lama para o LMCD 1',
      photos: [],
    }

    const { id } = await equipmentsRepository.create(data)

    const { equipment } = await sut.execute({ id })

    expect(equipment).toStrictEqual({ id, ...data })
  })

  it('shoud not be able to get equipment that does not exist', async () => {
    const id = 'id-that-does-not-exist'

    await expect(() => sut.execute({ id })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
