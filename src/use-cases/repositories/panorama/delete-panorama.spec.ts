import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPanoramasRepository } from '../../../repositories/in-memory/in-memory-panoramas-repository'
import { DeletePanoramaUseCases } from './delete-panorama'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { createPanorama } from '@/utils/test/create-panorama'
import { LocalImagesStorage } from '@/storage/local/local-images-storage'

let panoramasRepository: InMemoryPanoramasRepository
let imagesStorage: LocalImagesStorage
let sut: DeletePanoramaUseCases

describe('Delete Panorama Use Case', () => {
  beforeEach(() => {
    panoramasRepository = new InMemoryPanoramasRepository()
    imagesStorage = new LocalImagesStorage()
    sut = new DeletePanoramaUseCases(panoramasRepository, imagesStorage)
  })

  it('shoud be able to delete panorama', async () => {
    const { id } = await createPanorama(panoramasRepository, imagesStorage)

    await sut.execute({ id })

    const panorama = await panoramasRepository.findById(id)

    expect(panorama).toBeNull()
  })

  it('shoud not be able to delete non-existing panorama', async () => {
    const id = 'id-not-existing'

    await expect(() => sut.execute({ id })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
