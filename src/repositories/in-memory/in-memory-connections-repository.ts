import {
  Connection,
  ConnectionIds,
  ConnectionsRepository,
} from '../connections-repository'

export class InMemoryConnectionsRepository implements ConnectionsRepository {
  public connections: Connection[] = []

  async findByIds({ connected_from_id, connected_to_id }: ConnectionIds) {
    const connection = this.connections.find(
      (connection) =>
        connection.connected_from_id === connected_from_id &&
        connection.connected_to_id === connected_to_id,
    )

    if (!connection) return null

    return connection
  }

  async create(connection: Connection) {
    this.connections.push(connection)
  }

  async update({ connected_from_id, connected_to_id, pitch, yaw }: Connection) {
    this.connections = this.connections.map((connection) => {
      if (
        connection.connected_from_id === connected_from_id &&
        connection.connected_to_id === connected_to_id
      ) {
        return {
          connected_from_id,
          connected_to_id,
          yaw,
          pitch,
        }
      } else {
        return connection
      }
    })
  }

  async delete({ connected_from_id, connected_to_id }: ConnectionIds) {
    this.connections = this.connections.filter(
      (connection) =>
        connection.connected_from_id !== connected_from_id &&
        connection.connected_to_id !== connected_to_id,
    )
  }
}
