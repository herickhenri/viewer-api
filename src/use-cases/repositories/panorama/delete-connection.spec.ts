import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPanoramasRepository } from '../../../repositories/in-memory/in-memory-panoramas-repository'
import { DeleteConnectionUseCases } from './delete-connection'
import { createPanorama } from '@/utils/test/create-panorama'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

let panoramasRepository: InMemoryPanoramasRepository
let sut: DeleteConnectionUseCases

describe('delete Connection Use Case', () => {
  beforeEach(() => {
    panoramasRepository = new InMemoryPanoramasRepository()
    sut = new DeleteConnectionUseCases(panoramasRepository)
  })

  it('shoud be able to delete connection', async () => {
    const { id: firstPanoramaId } = await createPanorama(panoramasRepository)
    const { id: secondPanoramaId } = await createPanorama(panoramasRepository)

    const firstLink = {
      panorama_id: firstPanoramaId,
      coord_x: 100,
      coord_y: 100,
      panorama_connect_id: secondPanoramaId,
    }
    const secondLink = {
      panorama_id: secondPanoramaId,
      coord_x: 200,
      coord_y: 200,
      panorama_connect_id: firstPanoramaId,
    }

    await panoramasRepository.createConnection([firstLink, secondLink])

    const firstPanorama = await panoramasRepository.findById(firstPanoramaId)
    const secondPanorama = await panoramasRepository.findById(secondPanoramaId)

    await sut.execute({
      panorama_id: firstPanoramaId,
      panorama_connect_id: secondPanoramaId,
    })

    expect(firstPanorama?.links).toStrictEqual([])
    expect(secondPanorama?.links).toStrictEqual([])
  })
  it('shoud not be able to delete connection if panoramaId invalid', async () => {
    const panorama_connect_id = 'invalid-id'
    const panorama_id = 'invalid-id'

    expect(() =>
      sut.execute({ panorama_connect_id, panorama_id }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
