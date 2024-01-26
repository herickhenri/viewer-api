import { prisma } from '@/lib/prisma'
import {
  EquipmentInput,
  EquipmentsRepository,
  UpdateEquipment,
} from '../equipments-repository'

export class PrismaEquipmentsRepository implements EquipmentsRepository {
  async findByTag(tag: string) {
    const equipment = await prisma.equipment.findUnique({
      where: { tag },
      include: {
        photos: {
          select: {
            key: true,
            link: true,
          },
        },
      },
    })

    if (!equipment) {
      return null
    }

    return equipment
  }

  async findById(id: string) {
    const equipment = await prisma.equipment.findUnique({
      where: { id },
      include: {
        photos: {
          select: {
            key: true,
            link: true,
          },
        },
      },
    })

    if (!equipment) {
      return null
    }

    return equipment
  }

  async findMany() {
    const equipments = await prisma.equipment.findMany({
      include: {
        photos: {
          select: {
            key: true,
            link: true,
          },
        },
      },
    })
    return equipments
  }

  async create({ name, tag, description, photos }: EquipmentInput) {
    const equipment = await prisma.equipment.create({
      data: {
        name,
        tag,
        description,
        photos: {
          create: photos,
        },
      },
      include: {
        photos: {
          select: {
            key: true,
            link: true,
          },
        },
      },
    })

    return equipment
  }

  async update(
    { name, tag, description, photos }: UpdateEquipment,
    id: string,
  ) {
    const equipment = await prisma.equipment.update({
      where: { id },
      data: {
        name,
        tag,
        description,
        photos: {
          create: photos,
        },
      },
      include: {
        photos: {
          select: {
            key: true,
            link: true,
          },
        },
      },
    })

    return equipment
  }

  async delete(id: string) {
    await prisma.equipment.delete({
      where: { id },
    })
  }
}
