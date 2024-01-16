import { GetPanoramasUseCases } from '../get-panoramas'
import { PrismaPanoramasRepository } from '../../repositories/prisma/prisma-panoramas-repository'

export function makeGetPanoramasUseCases() {
  const panoramaRepository = new PrismaPanoramasRepository()
  const useCase = new GetPanoramasUseCases(panoramaRepository)

  return useCase
}
