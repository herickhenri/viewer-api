import { expect, describe, it, beforeEach } from 'vitest'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { GetPanoramaUseCases } from './get-panorama'
import { InMemoryPanoramasRepository } from '../../../repositories/in-memory/in-memory-panoramas-repository'
import { createPanorama } from '@/utils/test/create-panorama'

let panoramasRepository: InMemoryPanoramasRepository
let sut: GetPanoramaUseCases

describe('Get Panorama Use Case', () => {
  beforeEach(() => {
    panoramasRepository = new InMemoryPanoramasRepository()
    sut = new GetPanoramaUseCases(panoramasRepository)
  })

  it('shoud be able to get panorama by id', async () => {
    const { id } = await createPanorama(panoramasRepository)

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
