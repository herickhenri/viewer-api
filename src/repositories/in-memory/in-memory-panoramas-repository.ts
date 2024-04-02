import { Prisma } from '@prisma/client'
import {
  Connection,
  Link,
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
    links,
  }: PanoramaInput) {
    const panorama = {
      id: randomUUID(),
      name,
      image_key,
      image_link,
      gps_x: gps_x ? new Prisma.Decimal(gps_x) : null,
      gps_y: gps_y ? new Prisma.Decimal(gps_y) : null,
      markings,
      links,
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

  async createConnection(connection: Connection) {
    function updatePanorama(panorama: Panorama, link: Link) {
      // Remove the link if it already exists
      const newLinks = panorama.links?.filter(
        (linkCheck) =>
          linkCheck.panorama_connect_id !== link.panorama_connect_id,
      )

      // adds the new link to the panorama
      const panoramaUpdated: Panorama = {
        ...panorama,
        links: newLinks ? [...newLinks, link] : [link],
      }

      return panoramaUpdated
    }

    const [firstLink, secondLink] = connection
    const firstIndex = this.panoramas.findIndex(
      (panorama) => panorama.id === firstLink.panorama_id,
    )
    const secondIndex = this.panoramas.findIndex(
      (panorama) => panorama.id === secondLink.panorama_id,
    )

    const firstPanorama = this.panoramas[firstIndex]
    const secondPanorama = this.panoramas[secondIndex]

    const firstPanoramaUpdated = updatePanorama(firstPanorama, firstLink)
    const secondPanoramaUpdated = updatePanorama(secondPanorama, secondLink)

    this.panoramas.splice(firstIndex, 1, firstPanoramaUpdated)
    this.panoramas.splice(secondIndex, 1, secondPanoramaUpdated)
  }
}
