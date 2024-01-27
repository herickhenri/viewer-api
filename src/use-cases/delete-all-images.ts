import { ImagesStorage } from '../storage/images-storage'

interface deleteAllImagesRequest {
  keys: string[]
}

export class DeleteAllImagesUseCases {
  constructor(private imagesStorage: ImagesStorage) {}

  async execute({ keys }: deleteAllImagesRequest) {
    await this.imagesStorage.deleteMany(keys)
  }
}
