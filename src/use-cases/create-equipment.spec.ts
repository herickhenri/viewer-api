import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEquipmentsRepository } from '../repositories/in-memory/in-memory-equipments-repository'
import { CreateEquipmentUseCases } from './create-equipment'
import { EquipmentAlreadyExistsError } from './errors/equipment-already-exists-error'
import { IncorrectlyFormattedTagError } from './errors/incorrectly-formatted-tag-error'

let equipmentsRepository: InMemoryEquipmentsRepository
let sut: CreateEquipmentUseCases

describe('Create Equipment Use Case', () => {
  beforeEach(() => {
    equipmentsRepository = new InMemoryEquipmentsRepository()
    sut = new CreateEquipmentUseCases(equipmentsRepository)
  })

  it('shoud be able to create equipment', async () => {
    const data = {
      name: 'Equipment-1',
      tag: 'A-1111-BB-222',
      description: 'The equipment-1',
      photos: [
        {
          link: 'example-link',
          key: 'example-key',
        },
      ],
    }

    const { equipment } = await sut.execute(data)

    expect(equipment).toStrictEqual({ id: equipment.id, ...data })
  })

  it('shoud not be able create equipment with an existing tag', async () => {
    const tag = 'I-1501-BB-101'

    await sut.execute({
      name: 'Bomba de lama',
      tag,
      description: 'Bomba de lama para o LMCD 1',
    })

    await expect(() =>
      sut.execute({
        name: 'Bomba de lama',
        tag,
        description: 'Bomba de lama para o LMCD 1',
      }),
    ).rejects.toBeInstanceOf(EquipmentAlreadyExistsError)
  })

  it('shoud not be able create equipment with an tag not capitalized', async () => {
    const invalidTag = 'aa-1111-bb-222'

    await expect(() =>
      sut.execute({
        name: 'equipment',
        tag: invalidTag,
      }),
    ).rejects.toBeInstanceOf(IncorrectlyFormattedTagError)
  })

  it('shoud not be able create equipment with an tag not contain four fields', async () => {
    const invalidTag = 'AA-1111-BB-222-CC'

    await expect(() =>
      sut.execute({
        name: 'equipment',
        tag: invalidTag,
      }),
    ).rejects.toBeInstanceOf(IncorrectlyFormattedTagError)
  })

  it('shoud not be able create equipment with an tag not correct sizes', async () => {
    const invalidTag = 'AAAA-1111-BBBB-2222'

    await expect(() =>
      sut.execute({
        name: 'equipment',
        tag: invalidTag,
      }),
    ).rejects.toBeInstanceOf(IncorrectlyFormattedTagError)
  })
})
