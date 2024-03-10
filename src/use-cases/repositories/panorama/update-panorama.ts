import {
  Panorama,
  PanoramasRepository,
  UpdatePanorama,
} from '../../../repositories/panoramas-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

interface updatePanoramaRequest {
  data: UpdatePanorama
  id: string
}

interface updatePanoramaResponse {
  panorama: Panorama
}

export class UpdatePanoramaUseCases {
  constructor(private panoramasRepository: PanoramasRepository) {}

  async execute({
    data,
    id,
  }: updatePanoramaRequest): Promise<updatePanoramaResponse> {
    data.links?.forEach((link) => {
      const panoramaFound = this.panoramasRepository.findById(
        link.panorama_connect_id,
      )

      if (!panoramaFound) {
        throw new ResourceNotFoundError()
      }
    })

    const panoramaFound = await this.panoramasRepository.findById(id)

    if (!panoramaFound) {
      throw new ResourceNotFoundError()
    }

    const panorama = await this.panoramasRepository.update(data, id)

    return { panorama }
  }
}
