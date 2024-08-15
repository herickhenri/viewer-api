import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import {
  Panorama,
  PanoramasRepository,
} from '../../../repositories/panoramas-repository'
import { ImagesStorage } from '@/storage/images-storage'
import sharp from 'sharp'

interface createPanoramaRequest {
  name: string
  file: {
    buffer: Buffer
    contentType: string
  }
  equipments?: {
    coord_x: number
    coord_y: number
    equipment_id: string
  }[]
  links?: {
    coord_x: number
    coord_y: number
    panorama_connect_id: string
  }[]
}

interface createPanoramaResponse {
  panorama: Panorama
}

export class CreatePanoramaUseCases {
  constructor(
    private panoramasRepository: PanoramasRepository,
    private imagesStorage: ImagesStorage,
  ) {}

  async execute({
    name,
    file,
    equipments,
    links,
  }: createPanoramaRequest): Promise<createPanoramaResponse> {
    links?.forEach((link) => {
      const panoramaFound = this.panoramasRepository.findById(
        link.panorama_connect_id,
      )

      if (!panoramaFound) {
        throw new ResourceNotFoundError()
      }
    })

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

    const images = await Promise.all(
      fileBuffers.map(async (file) => {
        const image = await this.imagesStorage.upload(file)

        return {
          key: image.key,
          link: image.link,
          quality: file.size,
        }
      }),
    )

    const panorama = await this.panoramasRepository.create({
      name,
      equipments,
      images,
    })

    return {
      panorama,
    }
  }
}
