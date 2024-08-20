import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPanoramasRepository } from '../../../repositories/in-memory/in-memory-panoramas-repository'
import { CreateConnectionUseCases } from './create-connection'
import { createPanorama } from '@/utils/test/create-panorama'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { LocalImagesStorage } from '@/storage/local/local-images-storage'
import { InMemoryConnectionsRepository } from '@/repositories/in-memory/in-memory-connections-repository'
import { DeletePanoramaUseCases } from './delete-panorama'

let panoramasRepository: InMemoryPanoramasRepository
let connectionsRepository: InMemoryConnectionsRepository
let imagesStorage: LocalImagesStorage
let sut: CreateConnectionUseCases
let deletePanorama: DeletePanoramaUseCases

describe('Create Connection Use Case', () => {
  beforeEach(() => {
    connectionsRepository = new InMemoryConnectionsRepository()
    panoramasRepository = new InMemoryPanoramasRepository()
    imagesStorage = new LocalImagesStorage()
    sut = new CreateConnectionUseCases(
      connectionsRepository,
      panoramasRepository,
    )

    deletePanorama = new DeletePanoramaUseCases(
      panoramasRepository,
      imagesStorage,
    )
  })

  it('shoud be able to create connection', async () => {
    const { id: firstPanoramaId } = await createPanorama(
      panoramasRepository,
      imagesStorage,
    )
    const { id: secondPanoramaId } = await createPanorama(
      panoramasRepository,
      imagesStorage,
    )

    const firstConnection = {
      yaw: 100,
      pitch: 100,
      connected_from_id: firstPanoramaId,
      connected_to_id: secondPanoramaId,
    }
    const secondConnection = {
      yaw: 100,
      pitch: 100,
      connected_from_id: secondPanoramaId,
      connected_to_id: firstPanoramaId,
    }

    await sut.execute({ connections: [firstConnection, secondConnection] })

    const firstConnectionData = await connectionsRepository.findByIds({
      connected_from_id: firstPanoramaId,
      connected_to_id: secondPanoramaId,
    })
    const secondConnectionData = await connectionsRepository.findByIds({
      connected_from_id: secondPanoramaId,
      connected_to_id: firstPanoramaId,
    })

    expect(firstConnectionData).toEqual(firstConnection)
    expect(secondConnectionData).toEqual(secondConnection)

    // clean images created
    await deletePanorama.execute({ id: firstPanoramaId })
    await deletePanorama.execute({ id: secondPanoramaId })
  })
  it('shoud not be able to create connection if panoramaId invalid', async () => {
    const firstPanoramaId = 'invalid-id'
    const secondPanoramaId = 'invalid-id'

    expect(() =>
      sut.execute({
        connections: [
          {
            yaw: 100,
            pitch: 100,
            connected_from_id: firstPanoramaId,
            connected_to_id: secondPanoramaId,
          },
          {
            yaw: 100,
            pitch: 100,
            connected_from_id: secondPanoramaId,
            connected_to_id: firstPanoramaId,
          },
        ],
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
