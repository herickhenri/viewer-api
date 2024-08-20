import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPanoramasRepository } from '../../../repositories/in-memory/in-memory-panoramas-repository'
import { DeleteConnectionUseCases } from './delete-connection'
import { createPanorama } from '@/utils/test/create-panorama'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { LocalImagesStorage } from '@/storage/local/local-images-storage'
import { InMemoryConnectionsRepository } from '@/repositories/in-memory/in-memory-connections-repository'

let connectionsRepository: InMemoryConnectionsRepository
let panoramasRepository: InMemoryPanoramasRepository
let imagesStorage: LocalImagesStorage
let sut: DeleteConnectionUseCases

describe('delete Connection Use Case', () => {
  beforeEach(() => {
    connectionsRepository = new InMemoryConnectionsRepository()
    panoramasRepository = new InMemoryPanoramasRepository()
    imagesStorage = new LocalImagesStorage()
    sut = new DeleteConnectionUseCases(
      connectionsRepository,
      panoramasRepository,
    )
  })

  it('shoud be able to delete connection', async () => {
    const firstPanorama = await createPanorama(
      panoramasRepository,
      imagesStorage,
    )
    const secondPanorama = await createPanorama(
      panoramasRepository,
      imagesStorage,
    )

    const firstConnection = {
      yaw: 100,
      pitch: 100,
      connected_from_id: firstPanorama.id,
      connected_to_id: secondPanorama.id,
    }

    const secondConnection = {
      yaw: 100,
      pitch: 100,
      connected_from_id: secondPanorama.id,
      connected_to_id: firstPanorama.id,
    }

    await connectionsRepository.create(firstConnection)
    await connectionsRepository.create(secondConnection)

    await sut.execute({ connectionsIds: [firstConnection, secondConnection] })

    const firstConnectionIsDeleted = await connectionsRepository.findByIds({
      connected_from_id: firstPanorama.id,
      connected_to_id: secondPanorama.id,
    })
    const secondConnectionIsDeleted = await connectionsRepository.findByIds({
      connected_from_id: secondPanorama.id,
      connected_to_id: firstPanorama.id,
    })

    expect(firstConnectionIsDeleted).toStrictEqual(null)
    expect(secondConnectionIsDeleted).toStrictEqual(null)

    // clean images created
    const firstKeys = firstPanorama.images.map(({ key }) => key)
    const secondKeys = secondPanorama.images.map(({ key }) => key)
    const allKeys = firstKeys.concat(secondKeys)
    await imagesStorage.deleteMany(allKeys)
  })
  it('shoud not be able to delete connection if panoramaId invalid', async () => {
    const firstConnection = {
      connected_from_id: 'invalid-id',
      connected_to_id: 'invalid-id',
    }

    const secondConnection = {
      connected_from_id: 'invalid-id',
      connected_to_id: 'invalid-id',
    }

    expect(() =>
      sut.execute({ connectionsIds: [firstConnection, secondConnection] }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
