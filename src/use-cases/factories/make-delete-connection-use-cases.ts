import { PrismaPanoramasRepository } from '../../repositories/prisma/prisma-panoramas-repository'
import { DeleteConnectionUseCases } from '../repositories/panorama/delete-connection'

export function makeDeleteConnectionUseCases() {
  const panoramaRepository = new PrismaPanoramasRepository()
  const useCase = new DeleteConnectionUseCases(panoramaRepository)

  return useCase
}
