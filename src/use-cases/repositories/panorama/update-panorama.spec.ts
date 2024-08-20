import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPanoramasRepository } from '../../../repositories/in-memory/in-memory-panoramas-repository'
import { UpdatePanoramaUseCases } from './update-panorama'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { createPanorama } from '@/utils/test/create-panorama'
import { LocalImagesStorage } from '@/storage/local/local-images-storage'

let panoramasRepository: InMemoryPanoramasRepository
let imagesStorage: LocalImagesStorage
let sut: UpdatePanoramaUseCases

describe('Update Panorama Use Case', () => {
  beforeEach(() => {
    panoramasRepository = new InMemoryPanoramasRepository()
    imagesStorage = new LocalImagesStorage()
    sut = new UpdatePanoramaUseCases(panoramasRepository, imagesStorage)
  })

  it('shoud be able to update panorama', async () => {
    const { id, images } = await createPanorama(
      panoramasRepository,
      imagesStorage,
    )

    const updatePanorama = {
      name: 'Piso dos dregs',
    }
    const { panorama } = await sut.execute({ data: updatePanorama, id })

    expect(panorama.name).toBe('Piso dos dregs')

    // clean images
    const keys = images.map(({ key }) => key)
    imagesStorage.deleteMany(keys)
  })

  it('shoud not be able to update non-existing panorama', async () => {
    const id = 'id-not-existing'

    const updatePanorama = {
      name: 'Bomba de condensado',
    }

    await expect(() =>
      sut.execute({ data: updatePanorama, id }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('shoud be able update panorama with markings empty', async () => {
    const { id, images } = await createPanorama(
      panoramasRepository,
      imagesStorage,
    )

    const { panorama } = await sut.execute({ data: { equipments: [] }, id })

    expect(panorama.equipments).toStrictEqual([])

    // clean images
    const keys = images.map(({ key }) => key)
    imagesStorage.deleteMany(keys)
  })
})
