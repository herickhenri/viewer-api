import { AmazonS3ImagesStorage } from '@/storage/amazon-s3/amazon-s3-images-storage'
import { UploadAllImagesUseCases } from '../upload-all-images'

export function makeUploadAllImagesUseCases() {
  const amazonS3ImagesStorage = new AmazonS3ImagesStorage()
  const useCase = new UploadAllImagesUseCases(amazonS3ImagesStorage)

  return useCase
}
