import { GetEquipmentsUseCases } from '../get-equipments'
import { PrismaEquipmentsRepository } from '../../repositories/prisma/prisma-equipments-repository'

export function makeGetEquipmentsUseCases() {
  const equipmentsRepository = new PrismaEquipmentsRepository()
  const useCase = new GetEquipmentsUseCases(equipmentsRepository)

  return useCase
}
