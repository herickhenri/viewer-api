import {
  ConnectionIds,
  ConnectionsRepository,
} from '@/repositories/connections-repository'
import { PanoramasRepository } from '@/repositories/panoramas-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

type deleteConnectionRequest = {
  connectionsIds: [ConnectionIds, ConnectionIds]
}

export class DeleteConnectionUseCases {
  constructor(
    private connectionsRepository: ConnectionsRepository,
    private panoramasRepository: PanoramasRepository,
  ) {}

  private async deleteConnection(ids: ConnectionIds) {
    const panoramaFromExist = await this.panoramasRepository.findById(
      ids.connected_from_id,
    )
    const panoramaToExist = await this.panoramasRepository.findById(
      ids.connected_to_id,
    )

    if (!panoramaFromExist || !panoramaToExist) {
      throw new ResourceNotFoundError()
    }

    await this.connectionsRepository.delete(ids)
  }

  async execute({ connectionsIds }: deleteConnectionRequest) {
    await this.deleteConnection(connectionsIds[0])
    await this.deleteConnection(connectionsIds[1])
  }
}
