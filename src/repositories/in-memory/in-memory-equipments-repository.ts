import {
  Equipment,
  EquipmentInput,
  EquipmentsRepository,
  UpdateEquipment,
} from '../equipments-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryEquipmentsRepository implements EquipmentsRepository {
  public equipments: Equipment[] = []

  async findByTag(tag: string) {
    const equipment = this.equipments.find((equipment) => equipment.tag === tag)

    if (!equipment) {
      return null
    }
    return equipment
  }

  async findById(id: string) {
    const equipment = this.equipments.find((equipment) => equipment.id === id)

    if (!equipment) {
      return null
    }
    return equipment
  }

  async findMany() {
    return this.equipments
  }

  async create(data: EquipmentInput) {
    const equipment = {
      id: randomUUID(),
      tag: data.tag,
      name: data.name,
      description: data.description || null,
      photos: data.photos,
    }

    this.equipments.push(equipment)

    return equipment
  }

  async update(data: UpdateEquipment, id: string) {
    const index = this.equipments.findIndex((equipment) => equipment.id === id)
    const equipment = this.equipments.find((equipment) => equipment.id === id)

    if (!equipment) {
      throw new Error('Resourses not found.')
    }

    const updatedEquipment = {
      id: equipment.id,
      tag: data.tag || equipment.tag,
      name: data.name || equipment.name,
      description:
        typeof data.description === 'string'
          ? data.description
          : equipment.description,
      photos: data.photos || equipment.photos,
    }

    this.equipments.splice(index, 1, updatedEquipment)

    return updatedEquipment
  }

  async delete(id: string) {
    this.equipments = this.equipments.filter((equipment) => equipment.id !== id)
  }
}
