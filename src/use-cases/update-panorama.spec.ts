import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPanoramasRepository } from '../repositories/in-memory/in-memory-panoramas-repository'
import { UpdatePanoramaUseCases } from './update-panorama'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let panoramasRepository: InMemoryPanoramasRepository
let sut: UpdatePanoramaUseCases

describe('Update Panorama Use Case', () => {
  beforeEach(() => {
    panoramasRepository = new InMemoryPanoramasRepository()
    sut = new UpdatePanoramaUseCases(panoramasRepository)
  })

  it('shoud be able to update panorama', async () => {
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

    const updatePanorama = {
      name: 'Piso dos dregs',
    }
    const { panorama } = await sut.execute({ data: updatePanorama, id })

    expect(panorama.name).toBe('Piso dos dregs')
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

    const { panorama } = await sut.execute({ data: { markings: [] }, id })

    expect(panorama.markings).toStrictEqual([])
  })
})
