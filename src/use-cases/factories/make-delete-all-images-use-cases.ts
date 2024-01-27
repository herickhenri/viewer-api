import { AmazonS3ImagesStorage } from '@/storage/amazon-s3/amazon-s3-images-storage'
import { DeleteAllImagesUseCases } from '../delete-all-images'

export function makeDeleteAllImagesUseCases() {
  const amazonS3ImagesStorage = new AmazonS3ImagesStorage()
  const useCase = new DeleteAllImagesUseCases(amazonS3ImagesStorage)

  return useCase
}
