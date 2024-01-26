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
            equipment_id: true,
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
            equipment_id: true,
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
            equipment_id: true,
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
    if (markings) {
      await prisma.marking.updateMany({
        where: { panorama_id: id },
        data: markings,
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
      },
      include: {
        markings: true,
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
