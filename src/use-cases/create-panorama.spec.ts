import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPanoramasRepository } from '../repositories/in-memory/in-memory-panoramas-repository'
import { CreatePanoramaUseCases } from './create-panorama'

let panoramasRepository: InMemoryPanoramasRepository
let sut: CreatePanoramaUseCases

describe('Create Panorama Use Case', () => {
  beforeEach(() => {
    panoramasRepository = new InMemoryPanoramasRepository()
    sut = new CreatePanoramaUseCases(panoramasRepository)
  })

  it('shoud be able to create panorama', async () => {
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
    const { panorama } = await sut.execute(data)

    expect(panorama.name).toStrictEqual(data.name)
  })
})
