export type Connection = {
  yaw: number
  pitch: number
  connected_from_id: string
  connected_to_id: string
}

export type ConnectionIds = {
  connected_from_id: string
  connected_to_id: string
}

export interface ConnectionsRepository {
  findByIds(ConnectionIds: ConnectionIds): Promise<Connection | null>
  create(connection: Connection): Promise<void>
  update(connection: Connection): Promise<void>
  delete(connectionIds: ConnectionIds): Promise<void>
}
