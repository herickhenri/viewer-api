import { InMemoryPanoramasRepository } from '@/repositories/in-memory/in-memory-panoramas-repository'

export async function createPanorama(
  panoramasRepository: InMemoryPanoramasRepository,
) {
  const data = {
    name: 'panorama-1',
    image_key: 'example-key',
    image_link: 'example-link',
    gps_x: 10.5,
    gps_y: 20.2,
    markings: [
      {
        coord_x: 500,
        coord_y: 340,
        equipment_id: 'equipment-1',
      },
    ],
  }

  const panorama = await panoramasRepository.create(data)

  return panorama
}
