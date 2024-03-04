import { CloudflareR2ImagesStorage } from '@/storage/cloudflare-r2/cloudflare-r2-images-storage'
import { UploadImageUseCases } from '../storage/upload-image'

export function makeUploadImageUseCases() {
  const imagesStorage = new CloudflareR2ImagesStorage()
  const useCase = new UploadImageUseCases(imagesStorage)

  return useCase
}
