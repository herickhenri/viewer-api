import { PrismaConnectionsRepository } from '@/repositories/prisma/prisma-connections-repository'
import { PrismaPanoramasRepository } from '../../repositories/prisma/prisma-panoramas-repository'
import { CreateConnectionUseCases } from '../repositories/panorama/create-connection'

export function makeCreateConnectionUseCases() {
  const panoramaRepository = new PrismaPanoramasRepository()
  const connectionsRepository = new PrismaConnectionsRepository()
  const useCase = new CreateConnectionUseCases(
    connectionsRepository,
    panoramaRepository,
  )

  return useCase
}
