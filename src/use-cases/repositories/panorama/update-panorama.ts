import { ImagesStorage } from '@/storage/images-storage'
import {
  Panorama,
  PanoramasRepository,
} from '../../../repositories/panoramas-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import sharp from 'sharp'

type panoImage = {
  key: string
  link: string
  quality: number
}

interface updatePanoramaRequest {
  data: {
    name?: string
    file?: {
      buffer: Buffer
      contentType: string
    }
    equipments?: {
      yaw: number
      pitch: number
      equipment_id: string
    }[]
  }
  id: string
}

interface updatePanoramaResponse {
  panorama: Panorama
}

export class UpdatePanoramaUseCases {
  constructor(
    private panoramasRepository: PanoramasRepository,
    private imagesStorage: ImagesStorage,
  ) {}

  async execute({
    data: { equipments, file, name },
    id,
  }: updatePanoramaRequest): Promise<updatePanoramaResponse> {
    const panoramaFound = await this.panoramasRepository.findById(id)

    if (!panoramaFound) {
      throw new ResourceNotFoundError()
    }

    let images: panoImage[] | undefined

    if (file) {
      // delete old images
      const allOldKeys = panoramaFound.images.map(({ key }) => key)
      await this.imagesStorage.deleteMany(allOldKeys)

      // create new images
      const allSizes = [512, 1024, 2048, 4096, 8192]
      const metadata = await sharp(file.buffer).metadata()
      const width = metadata.width
      const sizesImage = allSizes.reduce((acc, size) => {
        if (width && size <= width) {
          acc.push(size)
        }
        return acc
      }, [] as number[])

      const fileBuffers = await Promise.all(
        sizesImage.map(async (size) => ({
          buffer: await sharp(file.buffer).resize({ width: size }).toBuffer(),
          contentType: file.contentType,
          size,
        })),
      )

      images = await Promise.all(
        fileBuffers.map(async (file) => {
          const image = await this.imagesStorage.upload(file)

          return {
            key: image.key,
            link: image.link,
            quality: file.size,
          }
        }),
      )
    }

    const panorama = await this.panoramasRepository.update(
      { equipments, images, name },
      id,
    )

    return { panorama }
  }
}
