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
  constructor(private PanoramasRepository: PanoramasRepository) {}

  async execute({
    name,
    image_key,
    image_link,
    gps_x,
    gps_y,
    markings,
  }: createPanoramaRequest): Promise<createPanoramaResponse> {
    const panorama = await this.PanoramasRepository.create({
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
