import { expect, describe, it, beforeEach } from 'vitest'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { GetPanoramaUseCases } from './get-panorama'
import { InMemoryPanoramasRepository } from '../../../repositories/in-memory/in-memory-panoramas-repository'
import { createPanorama } from '@/utils/test/create-panorama'
import { LocalImagesStorage } from '@/storage/local/local-images-storage'

let panoramasRepository: InMemoryPanoramasRepository
let imagesStorage: LocalImagesStorage
let sut: GetPanoramaUseCases

describe('Get Panorama Use Case', () => {
  beforeEach(() => {
    panoramasRepository = new InMemoryPanoramasRepository()
    imagesStorage = new LocalImagesStorage()
    sut = new GetPanoramaUseCases(panoramasRepository)
  })

  it('shoud be able to get panorama by id', async () => {
    const { id } = await createPanorama(panoramasRepository, imagesStorage)

    const { panorama } = await sut.execute({ id })

    expect(id).toStrictEqual(panorama.id)

    // clean images
    const keys = panorama.images.map(({ key }) => key)
    imagesStorage.deleteMany(keys)
  })

  it('shoud not be able to get panorama that does not exist', async () => {
    const id = 'id-that-does-not-exist'

    await expect(() => sut.execute({ id })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
