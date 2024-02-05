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

  async create({
    name,
    image_link,
    image_key,
    gps_x,
    gps_y,
    markings,
  }: PanoramaInput) {
    const panorama = {
      id: randomUUID(),
      name,
      image_key,
      image_link,
      gps_x: gps_x ? new Prisma.Decimal(gps_x) : null,
      gps_y: gps_y ? new Prisma.Decimal(gps_y) : null,
      markings,
    }

    this.panoramas.push(panorama)

    return panorama
  }

  async update(
    { name, image_key, image_link, gps_x, gps_y, markings }: UpdatePanorama,
    id: string,
  ) {
    const index = this.panoramas.findIndex((panorama) => panorama.id === id)
    const panorama = this.panoramas.find((panorama) => panorama.id === id)

    if (!panorama) {
      throw new Error('Resourses not found.')
    }

    const updatedPanorama = {
      id: panorama.id,
      name: name || panorama.name,
      image_link: image_link || panorama.image_link,
      image_key: image_key || panorama.image_key,
      gps_x: gps_x ? new Prisma.Decimal(gps_x) : panorama.gps_x,
      gps_y: gps_y ? new Prisma.Decimal(gps_y) : panorama.gps_y,
      markings: markings || panorama.markings,
    }

    this.panoramas.splice(index, 1, updatedPanorama)

    return updatedPanorama
  }

  async delete(id: string) {
    this.panoramas = this.panoramas.filter((panorama) => panorama.id !== id)
  }
}
