import {
  Panorama,
  PanoramasRepository,
} from '../repositories/panoramas-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface getPanoramaRequest {
  id: string
}

interface getPanoramaResponse {
  panorama: Panorama
}

export class GetPanoramaUseCases {
  constructor(private panoramasRepository: PanoramasRepository) {}

  async execute({ id }: getPanoramaRequest): Promise<getPanoramaResponse> {
    const panorama = await this.panoramasRepository.findById(id)

    if (!panorama) {
      throw new ResourceNotFoundError()
    }

    return {
      panorama,
    }
  }
}
