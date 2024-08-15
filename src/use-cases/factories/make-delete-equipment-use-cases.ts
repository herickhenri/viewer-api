import { DeleteEquipmentUseCases } from '../repositories/equipment/delete-equipment'
import { PrismaEquipmentsRepository } from '../../repositories/prisma/prisma-equipments-repository'
import { CloudflareR2ImagesStorage } from '@/storage/cloudflare-r2/cloudflare-r2-images-storage'

export function makeDeleteEquipmentUseCases() {
  const equipmentsRepository = new PrismaEquipmentsRepository()
  const cloudflareR2ImagesStorage = new CloudflareR2ImagesStorage()
  const useCase = new DeleteEquipmentUseCases(
    equipmentsRepository,
    cloudflareR2ImagesStorage,
  )

  return useCase
}
