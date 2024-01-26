import { ImagesStorage, acceptedTypes } from '../storage/images-storage'
import { UnacceptedFileFormat } from './errors/unaccepted-file-format'

interface uploadImageRequest {
  buffer: Buffer
  contentType: string
  name: string
}

export class UploadImageUseCases {
  constructor(private imagesStorage: ImagesStorage) {}

  async execute({ buffer, contentType, name }: uploadImageRequest) {
    if (!acceptedTypes.includes(contentType)) {
      throw new UnacceptedFileFormat()
    }
    const image = await this.imagesStorage.upload({ buffer, contentType, name })

    return { image }
  }
}
