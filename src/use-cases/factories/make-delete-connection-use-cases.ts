import { PrismaConnectionsRepository } from '@/repositories/prisma/prisma-connections-repository'
import { PrismaPanoramasRepository } from '../../repositories/prisma/prisma-panoramas-repository'
import { DeleteConnectionUseCases } from '../repositories/panorama/delete-connection'

export function makeDeleteConnectionUseCases() {
  const panoramaRepository = new PrismaPanoramasRepository()
  const connectionsRepository = new PrismaConnectionsRepository()
  const useCase = new DeleteConnectionUseCases(
    connectionsRepository,
    panoramaRepository,
  )

  return useCase
}
