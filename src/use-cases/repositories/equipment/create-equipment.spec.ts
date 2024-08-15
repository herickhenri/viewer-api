import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryEquipmentsRepository } from '../../../repositories/in-memory/in-memory-equipments-repository'
import { CreateEquipmentUseCases } from './create-equipment'
import { EquipmentAlreadyExistsError } from '../../errors/equipment-already-exists-error'
import { IncorrectlyFormattedTagError } from '../../errors/incorrectly-formatted-tag-error'
import { LocalImagesStorage } from '@/storage/local/local-images-storage'
import fs from 'node:fs'
import path from 'node:path'

let equipmentsRepository: InMemoryEquipmentsRepository
let imagesStorage: LocalImagesStorage
let sut: CreateEquipmentUseCases

describe('Create Equipment Use Case', () => {
  beforeEach(() => {
    equipmentsRepository = new InMemoryEquipmentsRepository()
    imagesStorage = new LocalImagesStorage()
    sut = new CreateEquipmentUseCases(equipmentsRepository, imagesStorage)
  })

  it('shoud be able to create equipment', async () => {
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'utils',
      'test',
      'test.png',
    )
    const buffer = fs.readFileSync(filePath)

    const data = {
      name: 'Equipment-1',
      tag: 'A-1111-BB-222',
      description: 'The equipment-1',
      files: [
        {
          buffer,
          contentType: 'image/png',
        },
      ],
    }

    const { equipment } = await sut.execute(data)

    expect(equipment).toStrictEqual({
      id: equipment.id,
      name: data.name,
      tag: data.tag,
      description: data.description,
      photos: equipment.photos,
    })

    // clean uploads
    const key = equipment.photos?.[0].key
    key && (await imagesStorage.delete(key))
  })

  it('shoud not be able create equipment with an existing tag', async () => {
    const tag = 'I-1501-BB-101'

    await sut.execute({
      name: 'Example name',
      tag,
      description: 'Example description',
    })

    await expect(() =>
      sut.execute({
        name: 'New example name',
        tag,
        description: 'New example description',
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
