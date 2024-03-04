import { ImagesStorage } from '../../storage/images-storage'

interface deleteImageRequest {
  key: string
}

export class DeleteImageUseCases {
  constructor(private imagesStorage: ImagesStorage) {}

  async execute({ key }: deleteImageRequest) {
    await this.imagesStorage.delete(key)
  }
}
