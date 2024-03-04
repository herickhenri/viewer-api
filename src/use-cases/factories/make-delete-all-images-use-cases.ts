import { CloudflareR2ImagesStorage } from '@/storage/cloudflare-r2/cloudflare-r2-images-storage'
import { DeleteAllImagesUseCases } from '../storage/delete-all-images'

export function makeDeleteAllImagesUseCases() {
  const imagesStorage = new CloudflareR2ImagesStorage()

  const useCase = new DeleteAllImagesUseCases(imagesStorage)

  return useCase
}
