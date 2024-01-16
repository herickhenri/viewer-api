import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPanoramasRepository } from '../repositories/in-memory/in-memory-panoramas-repository'
import { DeletePanoramaUseCases } from './delete-panorama'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let panoramasRepository: InMemoryPanoramasRepository
let sut: DeletePanoramaUseCases

describe('Delete Panorama Use Case', () => {
  beforeEach(() => {
    panoramasRepository = new InMemoryPanoramasRepository()
    sut = new DeletePanoramaUseCases(panoramasRepository)
  })

  it('shoud be able to delete panorama', async () => {
    const { id } = await panoramasRepository.create({
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
    })

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
