import { PanoramasRepository } from '../repositories/panoramas-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface deletePanoramaRequest {
  id: string
}

export class DeletePanoramaUseCases {
  constructor(private panoramasRepository: PanoramasRepository) {}

  async execute({ id }: deletePanoramaRequest) {
    const Panorama = await this.panoramasRepository.findById(id)

    if (!Panorama) {
      throw new ResourceNotFoundError()
    }

    await this.panoramasRepository.delete(id)
  }
}
