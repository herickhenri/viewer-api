import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPanoramasRepository } from '../repositories/in-memory/in-memory-panoramas-repository'
import { GetPanoramasUseCases } from './get-panoramas'

let panoramasRepository: InMemoryPanoramasRepository
let sut: GetPanoramasUseCases

describe('Get Panoramas Use Case', () => {
  beforeEach(() => {
    panoramasRepository = new InMemoryPanoramasRepository()
    sut = new GetPanoramasUseCases(panoramasRepository)
  })

  it('shoud be able to get panoramas', async () => {
    await panoramasRepository.create({
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

    const { panoramas } = await sut.execute()

    expect(panoramas).toBeTruthy()
  })
})
