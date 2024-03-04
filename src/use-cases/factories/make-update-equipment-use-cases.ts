import { UpdateEquipmentUseCases } from '../repositories/equipment/update-equipment'
import { PrismaEquipmentsRepository } from '../../repositories/prisma/prisma-equipments-repository'

export function makeUpdateEquipmentUseCases() {
  const equipmentsRepository = new PrismaEquipmentsRepository()
  const useCase = new UpdateEquipmentUseCases(equipmentsRepository)

  return useCase
}
