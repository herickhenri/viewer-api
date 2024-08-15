import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPanoramasRepository } from '../../../repositories/in-memory/in-memory-panoramas-repository'
import { CreatePanoramaUseCases } from './create-panorama'
import { LocalImagesStorage } from '@/storage/local/local-images-storage'
import fs from 'node:fs'
import path from 'node:path'

let panoramasRepository: InMemoryPanoramasRepository
let imagesStorage: LocalImagesStorage
let sut: CreatePanoramaUseCases

describe('Create Panorama Use Case', () => {
  beforeEach(() => {
    panoramasRepository = new InMemoryPanoramasRepository()
    imagesStorage = new LocalImagesStorage()
    sut = new CreatePanoramaUseCases(panoramasRepository, imagesStorage)
  })

  it('shoud be able to create panorama', async () => {
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'utils',
      'test',
      'panorama-example.jpeg',
    )
    const buffer = fs.readFileSync(filePath)

    const data = {
      name: 'panorama-1',
      file: {
        buffer,
        contentType: 'image/jpeg',
      },
      equipments: [
        {
          coord_x: 500,
          coord_y: 340,
          equipment_id: 'equipment-1',
        },
      ],
    }
    const { panorama } = await sut.execute(data)
    expect(panorama).toStrictEqual({
      name: data.name,
      equipments: data.equipments,
      id: panorama.id,
      links: undefined,
      images: panorama.images,
    })

    // clean uploads
    const allKeys = panorama.images.map(({ key }) => key)
    allKeys && (await imagesStorage.deleteMany(allKeys))
  })
})
