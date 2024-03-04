import { GetEquipmentsUseCases } from '../repositories/equipment/get-equipments'
import { PrismaEquipmentsRepository } from '../../repositories/prisma/prisma-equipments-repository'

export function makeGetEquipmentsUseCases() {
  const equipmentssRepository = new PrismaEquipmentsRepository()
  const useCase = new GetEquipmentsUseCases(equipmentssRepository)

  return useCase
}
