import { Prisma } from '@prisma/client'
import {
  Panorama,
  PanoramaInput,
  PanoramasRepository,
  UpdatePanorama,
} from '../panoramas-repository'
import { randomUUID } from 'crypto'

export class InMemoryPanoramasRepository implements PanoramasRepository {
  public panoramas: Panorama[] = []

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

  async create(data: PanoramaInput) {
    const panorama = {
      id: randomUUID(),
      name: data.name,
      image: data.image,
      gps_x: new Prisma.Decimal(data.gps_x),
      gps_y: new Prisma.Decimal(data.gps_y),
      markings: data.markings,
    }

    this.panoramas.push(panorama)

    return panorama
  }

  async update(data: UpdatePanorama, id: string) {
    const index = this.panoramas.findIndex((panorama) => panorama.id === id)
    const panorama = this.panoramas.find((panorama) => panorama.id === id)

    if (!panorama) {
      throw new Error('Resourses not found.')
    }

    const updatedPanorama = {
      id: panorama.id,
      name: data.name || panorama.name,
      image: data.image || panorama.image,
      gps_x: new Prisma.Decimal(data.gps_x || panorama.gps_x),
      gps_y: new Prisma.Decimal(data.gps_y || panorama.gps_y),
      markings: data.markings || panorama.markings,
    }

    this.panoramas.splice(index, 1, updatedPanorama)

    return updatedPanorama
  }

  async delete(id: string) {
    this.panoramas = this.panoramas.filter((panorama) => panorama.id !== id)
  }
}
