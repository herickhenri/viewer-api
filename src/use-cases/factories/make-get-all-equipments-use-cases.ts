import { GetAllEquipmentsUseCases } from '../repositories/equipment/get-all-equipments'
import { PrismaEquipmentsRepository } from '../../repositories/prisma/prisma-equipments-repository'

export function makeGetAllEquipmentsUseCases() {
  const equipmentsRepository = new PrismaEquipmentsRepository()
  const useCase = new GetAllEquipmentsUseCases(equipmentsRepository)

  return useCase
}
