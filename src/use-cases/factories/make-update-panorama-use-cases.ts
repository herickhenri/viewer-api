import { UpdatePanoramaUseCases } from '../repositories/panorama/update-panorama'
import { PrismaPanoramasRepository } from '../../repositories/prisma/prisma-panoramas-repository'

export function makeUpdatePanoramaUseCases() {
  const panoramaRepository = new PrismaPanoramasRepository()
  const useCase = new UpdatePanoramaUseCases(panoramaRepository)

  return useCase
}
