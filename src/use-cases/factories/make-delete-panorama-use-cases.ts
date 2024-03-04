import { DeletePanoramaUseCases } from '../repositories/panorama/delete-panorama'
import { PrismaPanoramasRepository } from '../../repositories/prisma/prisma-panoramas-repository'

export function makeDeletePanoramaUseCases() {
  const panoramaRepository = new PrismaPanoramasRepository()
  const useCase = new DeletePanoramaUseCases(panoramaRepository)

  return useCase
}
