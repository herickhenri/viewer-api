import { GetPanoramaUseCases } from '../repositories/panorama/get-panorama'
import { PrismaPanoramasRepository } from '../../repositories/prisma/prisma-panoramas-repository'

export function makeGetPanoramaUseCases() {
  const panoramaRepository = new PrismaPanoramasRepository()
  const useCase = new GetPanoramaUseCases(panoramaRepository)

  return useCase
}
