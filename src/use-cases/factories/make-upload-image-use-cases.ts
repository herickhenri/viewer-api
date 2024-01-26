import { AmazonS3ImagesStorage } from '@/storage/amazon-s3/amazon-s3-images-storage'
import { UploadImageUseCases } from '../upload-image'

export function makeUploadImageUseCases() {
  const amazonS3ImagesStorage = new AmazonS3ImagesStorage()
  const useCase = new UploadImageUseCases(amazonS3ImagesStorage)

  return useCase
}
