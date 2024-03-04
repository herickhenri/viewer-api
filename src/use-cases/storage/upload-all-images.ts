import {
  File,
  ImagesStorage,
  acceptedTypes,
} from '../../storage/images-storage'
import { UnacceptedFileFormat } from '../errors/unaccepted-file-format'

interface uploadImageRequest {
  files: File[]
}

export class UploadAllImagesUseCases {
  constructor(private imagesStorage: ImagesStorage) {}
  async execute({ files }: uploadImageRequest) {
    files.forEach((file) => {
      if (!acceptedTypes.includes(file.contentType)) {
        throw new UnacceptedFileFormat()
      }
    })

    const images = await this.imagesStorage.uploadMany(files)
    return { images }
  }
}
