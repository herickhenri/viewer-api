import { prisma } from '@/lib/prisma'
import {
  Connection,
  PanoramaInput,
  PanoramasRepository,
  UpdatePanorama,
} from '../panoramas-repository'

export class PrismaPanoramasRepository implements PanoramasRepository {
  async findById(id: string) {
    const panorama = await prisma.panorama.findUnique({
      where: { id },
      include: {
        markings: {
          select: {
            coord_x: true,
            coord_y: true,
            equipment_id: true,
          },
        },
        links: true,
      },
    })

    if (!panorama) {
      return null
    }

    return panorama
  }

  async findMany() {
    const panoramas = await prisma.panorama.findMany({
      include: {
        markings: {
          select: {
            coord_x: true,
            coord_y: true,
            equipment_id: true,
          },
        },
        links: true,
      },
    })

    return panoramas
  }

  async create({
    name,
    image_key,
    image_link,
    gps_x,
    gps_y,
    markings,
    links,
  }: PanoramaInput) {
    const panorama = await prisma.panorama.create({
      data: {
        name,
        image_key,
        image_link,
        gps_x,
        gps_y,
        markings: {
          create: markings,
        },
        links: {
          create: links,
        },
      },
      include: {
        markings: {
          select: {
            coord_x: true,
            coord_y: true,
            equipment_id: true,
          },
        },
        links: true,
      },
    })

    return panorama
  }

  async update(
    {
      name,
      image_key,
      image_link,
      gps_x,
      gps_y,
      markings,
      links,
    }: UpdatePanorama,
    id: string,
  ) {
    if (links) {
      await prisma.link.deleteMany({
        where: { panorama_id: id },
      })
    }
    if (markings) {
      await prisma.marking.deleteMany({
        where: { panorama_id: id },
      })
    }

    const panorama = await prisma.panorama.update({
      where: { id },
      data: {
        name,
        image_key,
        image_link,
        gps_x,
        gps_y,
        markings: {
          create: markings,
        },
        links: {
          create: links,
        },
      },
      include: {
        markings: {
          select: {
            coord_x: true,
            coord_y: true,
            equipment_id: true,
          },
        },
        links: true,
      },
    })

    return panorama
  }

  async delete(id: string) {
    await prisma.marking.deleteMany({
      where: { panorama_id: id },
    })
    await prisma.link.deleteMany({
      where: { panorama_id: id },
    })

    await prisma.panorama.delete({
      where: { id },
    })
  }

  async createConnection(connection: Connection) {
    connection.forEach(async (linkData) => {
      // Check if the connection already exists
      const connectionAlreadyExists = await prisma.link.findUnique({
        where: {
          panorama_id_panorama_connect_id: {
            panorama_connect_id: linkData.panorama_connect_id,
            panorama_id: linkData.panorama_id,
          },
        },
      })

      // If the connection exists, it is updated, if it does not exist, the connection is created
      if (connectionAlreadyExists) {
        await prisma.link.update({
          where: {
            panorama_id_panorama_connect_id: {
              panorama_connect_id: linkData.panorama_connect_id,
              panorama_id: linkData.panorama_id,
            },
          },
          data: linkData,
        })
      } else {
        await prisma.link.create({
          data: linkData,
        })
      }
    })
  }
}
