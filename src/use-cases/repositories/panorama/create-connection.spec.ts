import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPanoramasRepository } from '../../../repositories/in-memory/in-memory-panoramas-repository'
import { CreateConnectionUseCases } from './create-connection'
import { createPanorama } from '@/utils/test/create-panorama'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

let panoramasRepository: InMemoryPanoramasRepository
let sut: CreateConnectionUseCases

describe('Create Connection Use Case', () => {
  beforeEach(() => {
    panoramasRepository = new InMemoryPanoramasRepository()
    sut = new CreateConnectionUseCases(panoramasRepository)
  })

  it('shoud be able to create connection', async () => {
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

    await sut.execute([firstLink, secondLink])

    const firstPanorama = await panoramasRepository.findById(firstPanoramaId)
    const secondPanorama = await panoramasRepository.findById(secondPanoramaId)

    expect(firstPanorama?.links).contain(firstLink)
    expect(secondPanorama?.links).contain(secondLink)
  })
  it('shoud not be able to create connection if panoramaId invalid', async () => {
    const firstPanoramaId = 'invalid-id'
    const secondPanoramaId = 'invalid-id'

    expect(() =>
      sut.execute([
        {
          panorama_id: firstPanoramaId,
          coord_x: 100,
          coord_y: 100,
          panorama_connect_id: secondPanoramaId,
        },
        {
          panorama_id: secondPanoramaId,
          coord_x: 100,
          coord_y: 100,
          panorama_connect_id: firstPanoramaId,
        },
      ]),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
