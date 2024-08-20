import { prisma } from '@/lib/prisma'
import {
  Connection,
  ConnectionIds,
  ConnectionsRepository,
} from '../connections-repository'

export class PrismaConnectionsRepository implements ConnectionsRepository {
  async findByIds({ connected_from_id, connected_to_id }: ConnectionIds) {
    const connection = await prisma.connection.findUnique({
      where: {
        connected_from_id_connected_to_id: {
          connected_from_id,
          connected_to_id,
        },
      },
    })

    return connection
  }

  async create({ connected_from_id, connected_to_id, pitch, yaw }: Connection) {
    await prisma.connection.create({
      data: {
        pitch,
        yaw,
        connected_from_id,
        connected_to_id,
      },
    })
  }

  async update({ connected_from_id, connected_to_id, pitch, yaw }: Connection) {
    await prisma.connection.update({
      where: {
        connected_from_id_connected_to_id: {
          connected_from_id,
          connected_to_id,
        },
      },
      data: {
        yaw,
        pitch,
        connected_from_id,
        connected_to_id,
      },
    })
  }

  async delete({ connected_from_id, connected_to_id }: ConnectionIds) {
    await prisma.connection.delete({
      where: {
        connected_from_id_connected_to_id: {
          connected_from_id,
          connected_to_id,
        },
      },
    })
  }
}
