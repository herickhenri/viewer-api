import { CloudflareR2ImagesStorage } from '@/storage/cloudflare-r2/cloudflare-r2-images-storage'
import { DeleteImageUseCases } from '../storage/delete-image'

export function makeDeleteImageUseCases() {
  const imagesStorage = new CloudflareR2ImagesStorage()

  const useCase = new DeleteImageUseCases(imagesStorage)

  return useCase
}
