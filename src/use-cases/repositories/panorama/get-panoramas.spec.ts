import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPanoramasRepository } from '../../../repositories/in-memory/in-memory-panoramas-repository'
import { GetPanoramasUseCases } from './get-panoramas'
import { createPanorama } from '@/utils/test/create-panorama'
import { LocalImagesStorage } from '@/storage/local/local-images-storage'

let panoramasRepository: InMemoryPanoramasRepository
let imagesStorage: LocalImagesStorage
let sut: GetPanoramasUseCases

describe('Get Panoramas Use Case', () => {
  beforeEach(() => {
    panoramasRepository = new InMemoryPanoramasRepository()
    imagesStorage = new LocalImagesStorage()
    sut = new GetPanoramasUseCases(panoramasRepository)
  })

  it('shoud be able to get panoramas', async () => {
    const panoramaCreated = await createPanorama(
      panoramasRepository,
      imagesStorage,
    )

    const { panoramas } = await sut.execute()

    expect(panoramas).toEqual([panoramaCreated])

    // clean images
    const keys = panoramaCreated.images.map(({ key }) => key)
    imagesStorage.deleteMany(keys)
  })
})
