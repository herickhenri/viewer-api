import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import {
  Panorama,
  PanoramaInput,
  PanoramasRepository,
} from '../../../repositories/panoramas-repository'

type createPanoramaRequest = PanoramaInput

interface createPanoramaResponse {
  panorama: Panorama
}

export class CreatePanoramaUseCases {
  constructor(private panoramasRepository: PanoramasRepository) {}

  async execute({
    name,
    image_key,
    image_link,
    gps_x,
    gps_y,
    markings,
    links,
  }: createPanoramaRequest): Promise<createPanoramaResponse> {
    links?.forEach((link) => {
      const panoramaFound = this.panoramasRepository.findById(
        link.panorama_connect_id,
      )

      if (!panoramaFound) {
        throw new ResourceNotFoundError()
      }
    })

    const panorama = await this.panoramasRepository.create({
      name,
      image_key,
      image_link,
      gps_x,
      gps_y,
      markings,
    })

    return {
      panorama,
    }
  }
}
