import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEquipmentsRepository } from '../../../repositories/in-memory/in-memory-equipments-repository'
import { UpdateEquipmentUseCases } from './update-equipment'
import { IncorrectlyFormattedTagError } from '../../errors/incorrectly-formatted-tag-error'
import { EquipmentAlreadyExistsError } from '../../errors/equipment-already-exists-error'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { createEquipment } from '@/utils/test/create-equipment'

let equipmentsRepository: InMemoryEquipmentsRepository
let sut: UpdateEquipmentUseCases

describe('Update Equipment Use Case', () => {
  beforeEach(() => {
    equipmentsRepository = new InMemoryEquipmentsRepository()
    sut = new UpdateEquipmentUseCases(equipmentsRepository)
  })

  it('shoud be able to update equipment', async () => {
    const { id } = await createEquipment({ equipmentsRepository })
    const updateEquipment = {
      name: 'Equipment-2',
      tag: 'I-1111-BB-333',
      description: 'the equipment 2',
      photos: [
        {
          key: 'example-key-2',
          link: 'example-link-2',
        },
      ],
    }
    const { equipment } = await sut.execute({ data: updateEquipment, id })
    expect(equipment).toEqual({
      id,
      ...updateEquipment,
    })
  })

  it('shoud not be able to update non-existing equipment', async () => {
    const id = 'id-not-existing'

    const updateEquipment = {
      name: 'Bomba de condensado',
    }

    await expect(() =>
      sut.execute({ data: updateEquipment, id }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('shoud not be able update equipment with an existing tag', async () => {
    await createEquipment({
      equipmentsRepository,
      equipmentData: { name: 'equipment-1', tag: 'I-1111-BB-222' },
    })
    const { id } = await createEquipment({
      equipmentsRepository,
      equipmentData: { name: 'equipment-2', tag: 'I-0000-AA-333' },
    })

    await expect(() =>
      sut.execute({
        data: { tag: 'I-1111-BB-222' },
        id,
      }),
    ).rejects.toBeInstanceOf(EquipmentAlreadyExistsError)
  })

  it('shoud not be able update equipment with an tag not capitalized', async () => {
    const { id } = await equipmentsRepository.create({
      name: 'Bomba de lama',
      tag: 'I-1501-BB-101',
      description: 'Bomba de lama para o LMCD 1',
    })

    const invalidTag = 'aa-1111-bb-222'

    await expect(() =>
      sut.execute({
        data: { tag: invalidTag },
        id,
      }),
    ).rejects.toBeInstanceOf(IncorrectlyFormattedTagError)
  })

  it('shoud not be able update equipment with an tag not contain four fields', async () => {
    const invalidTag = 'AA-1111-BB-222-CC'

    const { id } = await equipmentsRepository.create({
      name: 'Bomba de lama',
      tag: 'I-1501-BB-101',
      description: 'Bomba de lama para o LMCD 1',
    })

    await expect(() =>
      sut.execute({
        data: { tag: invalidTag },
        id,
      }),
    ).rejects.toBeInstanceOf(IncorrectlyFormattedTagError)
  })

  it('shoud not be able update equipment with an tag not correct sizes', async () => {
    const invalidTag = 'AAAA-1111-BBBB-2222'

    const { id } = await equipmentsRepository.create({
      name: 'Bomba de lama',
      tag: 'I-1501-BB-101',
      description: 'Bomba de lama para o LMCD 1',
    })

    await expect(() =>
      sut.execute({
        data: { tag: invalidTag },
        id,
      }),
    ).rejects.toBeInstanceOf(IncorrectlyFormattedTagError)
  })

  it('shoud be able update equipment with description empty', async () => {
    const { id } = await equipmentsRepository.create({
      name: 'Bomba de lama',
      tag: 'I-1501-BB-101',
      description: 'Bomba de lama para o LMCD 1',
    })

    const { equipment } = await sut.execute({ data: { description: '' }, id })

    expect(equipment.description).toStrictEqual('')
  })

  it('shoud be able update equipment with photos empty', async () => {
    const { id } = await createEquipment({ equipmentsRepository })

    const { equipment } = await sut.execute({ data: { photos: [] }, id })

    expect(equipment.photos).toStrictEqual([])
  })

  it('shoud be able update equipment with the same tag', async () => {
    const tag = 'A-0000-BB-111'
    const { id } = await createEquipment({
      equipmentsRepository,
      equipmentData: {
        name: 'equipment-1',
        tag,
      },
    })

    const { equipment } = await sut.execute({
      data: { name: 'new-name', tag },
      id,
    })

    expect(equipment.name).toEqual('new-name')
  })
})
