import { prisma } from '@/lib/prisma'
import {
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
            equipment: {
              include: {
                photos: {
                  select: {
                    key: true,
                    link: true,
                  },
                },
              },
            },
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
        markings: {
          select: {
            coord_x: true,
            coord_y: true,
            equipment: {
              include: {
                photos: {
                  select: {
                    key: true,
                    link: true,
                  },
                },
              },
            },
          },
        },
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
      },
      include: {
        markings: {
          select: {
            coord_x: true,
            coord_y: true,
            equipment: {
              include: {
                photos: {
                  select: {
                    key: true,
                    link: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    return panorama
  }

  async update(
    { name, image_key, image_link, gps_x, gps_y, markings }: UpdatePanorama,
    id: string,
  ) {
    const panorama = await prisma.panorama.update({
      where: { id },
      data: {
        name,
        image_key,
        image_link,
        gps_x,
        gps_y,
        markings: {
          deleteMany: {
            panorama_id: id,
          },
          create: markings,
        },
      },
      include: {
        markings: {
          select: {
            coord_x: true,
            coord_y: true,
            equipment: {
              include: {
                photos: {
                  select: {
                    key: true,
                    link: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    return panorama
  }

  async delete(id: string) {
    await prisma.marking.deleteMany({
      where: { panorama_id: id },
    })

    await prisma.panorama.delete({
      where: { id },
    })
  }
}
