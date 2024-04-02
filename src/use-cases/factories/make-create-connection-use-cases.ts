import { PrismaPanoramasRepository } from '../../repositories/prisma/prisma-panoramas-repository'
import { CreateConnectionUseCases } from '../repositories/panorama/create-connection'

export function makeCreateConnectionUseCases() {
  const panoramaRepository = new PrismaPanoramasRepository()
  const useCase = new CreateConnectionUseCases(panoramaRepository)

  return useCase
}
