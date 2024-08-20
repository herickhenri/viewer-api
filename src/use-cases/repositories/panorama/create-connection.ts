import {
  Connection,
  ConnectionsRepository,
} from '@/repositories/connections-repository'
import { PanoramasRepository } from '@/repositories/panoramas-repository'
import { InvalidDataError } from '@/use-cases/errors/invalid-data-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

type createConnectionRequest = {
  connections: [Connection, Connection]
}

export class CreateConnectionUseCases {
  constructor(
    private connectionsRepository: ConnectionsRepository,
    private panoramasRepository: PanoramasRepository,
  ) {}

  private async createConnection(connection: Connection) {
    const panoramaFromExist = await this.panoramasRepository.findById(
      connection.connected_from_id,
    )
    const panoramaToExist = await this.panoramasRepository.findById(
      connection.connected_to_id,
    )

    if (!panoramaFromExist || !panoramaToExist) {
      throw new ResourceNotFoundError()
    }

    const connectionExist = await this.connectionsRepository.findByIds({
      connected_from_id: connection.connected_from_id,
      connected_to_id: connection.connected_to_id,
    })

    if (connectionExist) {
      await this.connectionsRepository.update(connection)
    } else {
      await this.connectionsRepository.create(connection)
    }
  }

  async execute({ connections }: createConnectionRequest) {
    const isIntertwinedConnection =
      connections[0].connected_to_id === connections[1].connected_from_id &&
      connections[1].connected_to_id === connections[0].connected_from_id

    if (!isIntertwinedConnection) {
      throw new InvalidDataError()
    }

    await this.createConnection(connections[0])
    await this.createConnection(connections[1])
  }
}
