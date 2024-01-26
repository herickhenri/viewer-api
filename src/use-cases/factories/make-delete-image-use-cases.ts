import { AmazonS3ImagesStorage } from '@/storage/amazon-s3/amazon-s3-images-storage'
import { DeleteImageUseCases } from '../delete-image'

export function makeDeleteImageUseCases() {
  const amazonS3ImagesStorage = new AmazonS3ImagesStorage()
  const useCase = new DeleteImageUseCases(amazonS3ImagesStorage)

  return useCase
}
