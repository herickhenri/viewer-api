import {
  Equipment,
  EquipmentInput,
  EquipmentsRepository,
  UpdateEquipment,
} from '../equipments-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryEquipmentsRepository implements EquipmentsRepository {
  private equipments: Equipment[] = []

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

  async findByIds(ids: string[]) {
    const equipments = this.equipments.filter((equipment) =>
      ids.includes(equipment.id),
    )

    if (!equipments) {
      return null
    }
    return equipments
  }

  async findMany() {
    return this.equipments
  }

  async create({ tag, name, description, photos }: EquipmentInput) {
    const equipment = {
      id: randomUUID(),
      tag,
      name,
      description: description || null,
      photos,
    }

    this.equipments.push(equipment)

    return equipment
  }

  async update(
    { name, tag, description, photos }: UpdateEquipment,
    id: string,
  ) {
    const index = this.equipments.findIndex((equipment) => equipment.id === id)
    const equipment = this.equipments.find((equipment) => equipment.id === id)

    if (!equipment) {
      throw new Error('Resourses not found.')
    }

    const updatedEquipment = {
      id: equipment.id,
      tag: tag || equipment.tag,
      name: name || equipment.name,
      description:
        typeof description === 'string' ? description : equipment.description,
      photos: photos || equipment.photos,
    }

    this.equipments.splice(index, 1, updatedEquipment)

    return updatedEquipment
  }

  async delete(id: string) {
    this.equipments = this.equipments.filter((equipment) => equipment.id !== id)
  }
}
