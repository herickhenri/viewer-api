import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPanoramasRepository } from '../../../repositories/in-memory/in-memory-panoramas-repository'
import { GetPanoramasUseCases } from './get-panoramas'
import { createPanorama } from '@/utils/test/create-panorama'

let panoramasRepository: InMemoryPanoramasRepository
let sut: GetPanoramasUseCases

describe('Get Panoramas Use Case', () => {
  beforeEach(() => {
    panoramasRepository = new InMemoryPanoramasRepository()
    sut = new GetPanoramasUseCases(panoramasRepository)
  })

  it('shoud be able to get panoramas', async () => {
    await createPanorama(panoramasRepository)

    const { panoramas } = await sut.execute()

    expect(panoramas).toBeTruthy()
  })
})
