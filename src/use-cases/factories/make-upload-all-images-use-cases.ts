import { CloudflareR2ImagesStorage } from '@/storage/cloudflare-r2/cloudflare-r2-images-storage'
import { UploadAllImagesUseCases } from '../storage/upload-all-images'

export function makeUploadAllImagesUseCases() {
  const imagesStorage = new CloudflareR2ImagesStorage()

  const useCase = new UploadAllImagesUseCases(imagesStorage)

  return useCase
}
