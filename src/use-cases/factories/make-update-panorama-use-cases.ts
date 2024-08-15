import { UpdatePanoramaUseCases } from '../repositories/panorama/update-panorama'
import { PrismaPanoramasRepository } from '../../repositories/prisma/prisma-panoramas-repository'
import { CloudflareR2ImagesStorage } from '@/storage/cloudflare-r2/cloudflare-r2-images-storage'

export function makeUpdatePanoramaUseCases() {
  const panoramaRepository = new PrismaPanoramasRepository()
  const cloudflareR2ImagesStorage = new CloudflareR2ImagesStorage()
  const useCase = new UpdatePanoramaUseCases(
    panoramaRepository,
    cloudflareR2ImagesStorage,
  )

  return useCase
}
