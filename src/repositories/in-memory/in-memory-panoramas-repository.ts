import {
  Connection,
  IdsOfPanoramaConnectionRelations,
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

  async create({ name, images, equipments, links }: PanoramaInput) {
    const panorama = {
      id: randomUUID(),
      name,
      images,
      equipments,
      links,
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

  async deleteConnection({
    panorama_connect_id,
    panorama_id,
  }: IdsOfPanoramaConnectionRelations) {
    this.panoramas = this.panoramas.map((panorama) => {
      const newPanorama = panorama

      if (panorama.id === panorama_id) {
        newPanorama.links =
          panorama.links?.filter(
            (link) => link.panorama_connect_id !== panorama_connect_id,
          ) || newPanorama.links
      }
      if (panorama.id === panorama_connect_id) {
        newPanorama.links =
          panorama.links?.filter(
            (link) => link.panorama_connect_id !== panorama_id,
          ) || newPanorama.links
      }

      return newPanorama
    })
  }
}
