import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEquipmentsRepository } from '../../../repositories/in-memory/in-memory-equipments-repository'
import { UpdateEquipmentUseCases } from './update-equipment'
import { IncorrectlyFormattedTagError } from '../../errors/incorrectly-formatted-tag-error'
import { EquipmentAlreadyExistsError } from '../../errors/equipment-already-exists-error'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { createEquipment } from '@/utils/test/create-equipment'
import { LocalImagesStorage } from '@/storage/local/local-images-storage'

let equipmentsRepository: InMemoryEquipmentsRepository
let imagesStorage: LocalImagesStorage
let sut: UpdateEquipmentUseCases

describe('Update Equipment Use Case', () => {
  beforeEach(() => {
    equipmentsRepository = new InMemoryEquipmentsRepository()
    imagesStorage = new LocalImagesStorage()
    sut = new UpdateEquipmentUseCases(equipmentsRepository, imagesStorage)
  })

  it('shoud be able to update equipment', async () => {
    const { id } = await createEquipment({
      equipmentsRepository,
      imagesStorage,
      isToCreateImage: true,
    })
    const updateEquipment = {
      name: 'Equipment-2',
      tag: 'A-1111-BB-222',
      description: 'The equipment 2',
      files: [],
    }
    const { equipment } = await sut.execute({ data: updateEquipment, id })
    expect(equipment).toEqual({
      id,
      name: updateEquipment.name,
      tag: updateEquipment.tag,
      description: updateEquipment.description,
      photos: [],
    })
  })

  it('shoud not be able to update non-existing equipment', async () => {
    const id = 'id-not-existing'

    const updateEquipment = {
      name: 'Example name',
    }

    await expect(() =>
      sut.execute({ data: updateEquipment, id }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('shoud not be able update equipment with an existing tag', async () => {
    await createEquipment({
      equipmentsRepository,
      imagesStorage,
      equipmentData: { name: 'equipment-1', tag: 'A-1111-BB-222' },
    })
    const { id } = await createEquipment({
      equipmentsRepository,
      imagesStorage,
      equipmentData: { name: 'equipment-2', tag: 'A-0000-CC-333' },
    })

    await expect(() =>
      sut.execute({
        data: { tag: 'A-1111-BB-222' },
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
    const { id } = await createEquipment({
      equipmentsRepository,
      imagesStorage,
      isToCreateImage: true,
    })

    const { equipment } = await sut.execute({ data: { files: [] }, id })

    expect(equipment.photos).toStrictEqual([])
  })

  it('shoud be able update equipment with the same tag', async () => {
    const tag = 'A-0000-BB-111'
    const { id } = await createEquipment({
      equipmentsRepository,
      imagesStorage,
      equipmentData: {
        name: 'equipment-1',
        tag,
      },
    })

    const { equipment } = await sut.execute({
      data: { name: 'Equipment 2', tag },
      id,
    })

    expect(equipment.name).toEqual('Equipment 2')
    expect(equipment.tag).toEqual(tag)
  })
})
