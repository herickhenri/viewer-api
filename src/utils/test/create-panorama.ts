import { InMemoryPanoramasRepository } from '@/repositories/in-memory/in-memory-panoramas-repository'
import path from 'node:path'
import fs from 'node:fs'
import { LocalImagesStorage } from '@/storage/local/local-images-storage'
import { CreatePanoramaUseCases } from '@/use-cases/repositories/panorama/create-panorama'

export async function createPanorama(
  panoramasRepository: InMemoryPanoramasRepository,
  imagesStorage: LocalImagesStorage,
) {
  const filePath = path.resolve(
    __dirname,
    '..',
    '..',
    'utils',
    'test',
    'panorama-example.jpeg',
  )

  const buffer = fs.readFileSync(filePath)

  const createPanoramaUseCases = new CreatePanoramaUseCases(
    panoramasRepository,
    imagesStorage,
  )

  const data = {
    name: 'panorama-1',
    file: {
      buffer,
      contentType: 'image/jpeg',
    },
    equipments: [
      {
        coord_x: 500,
        coord_y: 340,
        equipment_id: 'equipment-1',
      },
    ],
  }

  const { panorama } = await createPanoramaUseCases.execute(data)

  return panorama
}
