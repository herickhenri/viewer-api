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
        images: {
          select: {
            key: true,
            link: true,
            quality: true,
          },
        },
        equipments: {
          select: {
            yaw: true,
            pitch: true,
            equipment_id: true,
          },
        },
        notes: {
          select: {
            yaw: true,
            pitch: true,
            note_id: true,
          },
        },
        connections_from: true,
        connections_to: true,
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
            yaw: true,
            pitch: true,
            equipment_id: true,
          },
        },
        notes: {
          select: {
            yaw: true,
            pitch: true,
            note_id: true,
          },
        },
        connections_from: true,
        connections_to: true,
      },
    })

    return panoramas
  }

  async create({ name, images, equipments }: PanoramaInput) {
    const panorama = await prisma.panorama.create({
      data: {
        name,
        images: {
          create: images,
        },
        equipments: {
          create: equipments,
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
            yaw: true,
            pitch: true,
            equipment_id: true,
          },
        },
        notes: {
          select: {
            yaw: true,
            pitch: true,
            note_id: true,
          },
        },
        connections_from: true,
        connections_to: true,
      },
    })

    return panorama
  }

  async update({ name, images, equipments }: UpdatePanorama, id: string) {
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
            yaw: true,
            pitch: true,
            equipment_id: true,
          },
        },
        notes: {
          select: {
            yaw: true,
            pitch: true,
            note_id: true,
          },
        },
        connections_from: true,
        connections_to: true,
      },
    })

    return panorama
  }

  async delete(id: string) {
    await prisma.panorama.delete({
      where: { id },
    })
  }
}
