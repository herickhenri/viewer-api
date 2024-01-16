import { DeleteEquipmentUseCases } from '../delete-equipment'
import { PrismaEquipmentsRepository } from '../../repositories/prisma/prisma-equipments-repository'

export function makeDeleteEquipmentUseCases() {
  const equipmentsRepository = new PrismaEquipmentsRepository()
  const useCase = new DeleteEquipmentUseCases(equipmentsRepository)

  return useCase
}
