import { GetEquipmentUseCases } from '../repositories/equipment/get-equipment'
import { PrismaEquipmentsRepository } from '../../repositories/prisma/prisma-equipments-repository'

export function makeGetEquipmentUseCases() {
  const equipmentsRepository = new PrismaEquipmentsRepository()
  const useCase = new GetEquipmentUseCases(equipmentsRepository)

  return useCase
}
