import {
  Panorama,
  PanoramaInput,
  PanoramasRepository,
  UpdatePanorama,
} from '../panoramas-repository'
import { randomUUID } from 'crypto'

export class InMemoryPanoramasRepository implements PanoramasRepository {
  private panoramas: Panorama[] = []

  async findById(id: string) {
    const panorama = this.panoramas.find((panorama) => panorama.id === id)

    if (!panorama) {
      return null
    }

    return panorama
  }

  async findMany() {
    return this.panoramas
  }

  async create({ name, images, equipments }: PanoramaInput) {
    const panorama = {
      id: randomUUID(),
      name,
      images,
      equipments,
    }

    this.panoramas.push(panorama)

    return panorama
  }

  async update({ name, images, equipments }: UpdatePanorama, id: string) {
    const index = this.panoramas.findIndex((panorama) => panorama.id === id)
    const panorama = this.panoramas.find((panorama) => panorama.id === id)

    if (!panorama) {
      throw new Error('Resourses not found.')
    }

    const updatedPanorama = {
      id: panorama.id,
      name: name || panorama.name,
      images: images || panorama.images,
      equipments: equipments || panorama.equipments,
    }

    this.panoramas.splice(index, 1, updatedPanorama)

    return updatedPanorama
  }

  async delete(id: string) {
    this.panoramas = this.panoramas.filter((panorama) => panorama.id !== id)
  }
}
