import { prisma } from '@/lib/prisma'
import {
  Connection,
  IdsOfPanoramaConnectionRelations,
  PanoramaInput,
  PanoramasRepository,
  UpdatePanorama,
} from '../panoramas-repository'

export class PrismaPanoramasRepository implements PanoramasRepository {
  async findById(id: string) {
    const panorama = await prisma.panorama.findUnique({
      where: { id },
      include: {
        images: {
          select: {
            key: true,
            link: true,
            quality: true,
          },
        },
        equipments: {
          select: {
            coord_x: true,
            coord_y: true,
            equipment_id: true,
          },
        },
        notes: {
          select: {
            coord_x: true,
            coord_y: true,
            note_id: true,
          },
        },
        links: {
          select: {
            coord_x: true,
            coord_y: true,
            panorama_connect_id: true,
          },
        },
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
        images: {
          select: {
            key: true,
            link: true,
            quality: true,
          },
        },
        equipments: {
          select: {
            coord_x: true,
            coord_y: true,
            equipment_id: true,
          },
        },
        notes: {
          select: {
            coord_x: true,
            coord_y: true,
            note_id: true,
          },
        },
        links: {
          select: {
            coord_x: true,
            coord_y: true,
            panorama_connect_id: true,
          },
        },
      },
    })

    return panoramas
  }

  async create({ name, images, links, equipments }: PanoramaInput) {
    const panorama = await prisma.panorama.create({
      data: {
        name,
        images: {
          create: images,
        },
        equipments: {
          create: equipments,
        },
        links: {
          create: links,
        },
      },
      include: {
        images: {
          select: {
            key: true,
            link: true,
            quality: true,
          },
        },
        equipments: {
          select: {
            coord_x: true,
            coord_y: true,
            equipment_id: true,
          },
        },
        notes: {
          select: {
            coord_x: true,
            coord_y: true,
            note_id: true,
          },
        },
        links: {
          select: {
            coord_x: true,
            coord_y: true,
            panorama_connect_id: true,
          },
        },
      },
    })

    return panorama
  }

  async update(
    { name, images, links, equipments }: UpdatePanorama,
    id: string,
  ) {
    if (links) {
      await prisma.link.deleteMany({
        where: { panorama_id: id },
      })
    }
    if (equipments) {
      await prisma.equipmentsOnPanorama.deleteMany({
        where: { panorama_id: id },
      })
    }
    if (images) {
      await prisma.panoramaImage.deleteMany({
        where: { panorama_id: id },
      })
    }

    const panorama = await prisma.panorama.update({
      where: { id },
      data: {
        name,
        images: {
          create: images,
        },
        equipments: {
          create: equipments,
        },
        links: {
          create: links,
        },
      },
      include: {
        images: {
          select: {
            key: true,
            link: true,
            quality: true,
          },
        },
        equipments: {
          select: {
            coord_x: true,
            coord_y: true,
            equipment_id: true,
          },
        },
        notes: {
          select: {
            coord_x: true,
            coord_y: true,
            note_id: true,
          },
        },
        links: {
          select: {
            coord_x: true,
            coord_y: true,
            panorama_connect_id: true,
          },
        },
      },
    })

    return panorama
  }

  async delete(id: string) {
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

      // If the connection already exists, it is updated, if it does not exist, the connection is created
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

  async deleteConnection({
    panorama_id,
    panorama_connect_id,
  }: IdsOfPanoramaConnectionRelations) {
    await prisma.link.deleteMany({
      where: {
        panorama_id,
        panorama_connect_id,
      },
    })
  }
}
