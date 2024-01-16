import { expect, describe, it, beforeEach } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetPanoramaUseCases } from './get-panorama'
import { InMemoryPanoramasRepository } from '../repositories/in-memory/in-memory-panoramas-repository'

let panoramasRepository: InMemoryPanoramasRepository
let sut: GetPanoramaUseCases

describe('Get Panorama Use Case', () => {
  beforeEach(() => {
    panoramasRepository = new InMemoryPanoramasRepository()
    sut = new GetPanoramaUseCases(panoramasRepository)
  })

  it('shoud be able to get panorama by id', async () => {
    const data = {
      name: 'Piso dos PDs',
      image: 'http://file/image',
      gps_x: 10.5,
      gps_y: 20.2,
      markings: [
        {
          coord_x: 500,
          coord_y: 340,
          equipment_id: 'equipment-1',
        },
      ],
    }
    const { id } = await panoramasRepository.create(data)

    const { panorama } = await sut.execute({ id })

    expect(id).toStrictEqual(panorama.id)
  })

  it('shoud not be able to get panorama that does not exist', async () => {
    const id = 'id-that-does-not-exist'

    await expect(() => sut.execute({ id })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
