import { ImagesStorage } from '@/storage/images-storage'
import { PanoramasRepository } from '../../../repositories/panoramas-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

interface deletePanoramaRequest {
  id: string
}

export class DeletePanoramaUseCases {
  constructor(
    private panoramasRepository: PanoramasRepository,
    private imagesStorage: ImagesStorage,
  ) {}

  async execute({ id }: deletePanoramaRequest) {
    const panorama = await this.panoramasRepository.findById(id)

    if (!panorama) {
      throw new ResourceNotFoundError()
    }

    const allKeys = panorama.images.map(({ key }) => key)

    await this.imagesStorage.deleteMany(allKeys)

    await this.panoramasRepository.delete(id)
  }
}
