import { CreateEquipmentUseCases } from '../create-equipment'
import { PrismaEquipmentsRepository } from '../../repositories/prisma/prisma-equipments-repository'

export function makeCreateEquipmentUseCases() {
  const equipmentsRepository = new PrismaEquipmentsRepository()
  const useCase = new CreateEquipmentUseCases(equipmentsRepository)

  return useCase
}
