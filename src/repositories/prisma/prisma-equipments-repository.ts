import { prisma } from '../../lib/prisma'
import {
  EquipmentInput,
  EquipmentsRepository,
  UpdateEquipment,
} from '../equipments-repository'

export class PrismaEquipmentsRepository implements EquipmentsRepository {
  async findByTag(tag: string) {
    const equipment = await prisma.equipment.findUnique({
      where: { tag },
    })

    if (!equipment) {
      return null
    }

    return equipment
  }

  async findById(id: string) {
    const equipment = await prisma.equipment.findUnique({
      where: { id },
    })

    if (!equipment) {
      return null
    }

    return equipment
  }

  async findMany() {
    const equipments = await prisma.equipment.findMany()
    return equipments
  }

  async create(data: EquipmentInput) {
    const equipment = await prisma.equipment.create({
      data,
    })

    return equipment
  }

  async update(data: UpdateEquipment, id: string) {
    const equipment = await prisma.equipment.update({
      where: { id },
      data,
    })

    return equipment
  }

  async delete(id: string) {
    await prisma.equipment.delete({
      where: { id },
    })
  }
}
