import {
  Panorama,
  PanoramasRepository,
} from '../../../repositories/panoramas-repository'

interface getPanoramasResponse {
  panoramas: Panorama[]
}

export class GetPanoramasUseCases {
  constructor(private PanoramasRepository: PanoramasRepository) {}

  async execute(): Promise<getPanoramasResponse> {
    const panoramas = await this.PanoramasRepository.findMany()

    return {
      panoramas,
    }
  }
}
