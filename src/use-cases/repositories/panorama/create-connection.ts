import {
  Connection,
  PanoramasRepository,
} from '@/repositories/panoramas-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

type createConnectionRequest = Connection

export class CreateConnectionUseCases {
  constructor(private panoramasRepository: PanoramasRepository) {}

  async execute(connection: createConnectionRequest) {
    const [firstLink, secondLink] = connection
    const firstPanoramaExist = await this.panoramasRepository.findById(
      secondLink.panorama_connect_id,
    )
    const secondPanoramaExist = await this.panoramasRepository.findById(
      firstLink.panorama_connect_id,
    )
    if (!firstPanoramaExist || !secondPanoramaExist) {
      throw new ResourceNotFoundError()
    }

    await this.panoramasRepository.createConnection(connection)
  }
}
