import { CreatePanoramaUseCases } from '../create-panorama'
import { PrismaPanoramasRepository } from '../../repositories/prisma/prisma-panoramas-repository'

export function makeCreatePanoramaUseCases() {
  const panoramaRepository = new PrismaPanoramasRepository()
  const useCase = new CreatePanoramaUseCases(panoramaRepository)

  return useCase
}
