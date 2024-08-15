import {
  IdsOfPanoramaConnectionRelations,
  PanoramasRepository,
} from '@/repositories/panoramas-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

type deleteConnectionRequest = IdsOfPanoramaConnectionRelations

export class DeleteConnectionUseCases {
  constructor(private panoramasRepository: PanoramasRepository) {}

  async execute(ids: deleteConnectionRequest) {
    const { panorama_connect_id, panorama_id } = ids

    const firstPanoramaExist =
      await this.panoramasRepository.findById(panorama_id)
    const secondPanoramaExist =
      await this.panoramasRepository.findById(panorama_connect_id)

    if (!firstPanoramaExist || !secondPanoramaExist) {
      throw new ResourceNotFoundError()
    }

    await this.panoramasRepository.deleteConnection(ids)
  }
}
