import { UpdateEquipmentUseCases } from '../repositories/equipment/update-equipment'
import { PrismaEquipmentsRepository } from '../../repositories/prisma/prisma-equipments-repository'
import { CloudflareR2ImagesStorage } from '@/storage/cloudflare-r2/cloudflare-r2-images-storage'

export function makeUpdateEquipmentUseCases() {
  const equipmentsRepository = new PrismaEquipmentsRepository()
  const cloudflareR2ImagesStorage = new CloudflareR2ImagesStorage()
  const useCase = new UpdateEquipmentUseCases(
    equipmentsRepository,
    cloudflareR2ImagesStorage,
  )

  return useCase
}
