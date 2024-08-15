import { InMemoryEquipmentsRepository } from '@/repositories/in-memory/in-memory-equipments-repository'
import { ImagesStorage } from '@/storage/images-storage'
import { CreateEquipmentUseCases } from '@/use-cases/repositories/equipment/create-equipment'
import fs from 'node:fs'
import path from 'node:path'

type Equipment = {
  name: string
  tag: string
  description?: string
  photos?: {
    link: string
    key: string
  }[]
}

interface createEquipmentProps {
  equipmentsRepository: InMemoryEquipmentsRepository
  imagesStorage: ImagesStorage
  equipmentData?: Equipment
  isToCreateImage?: boolean
}

export async function createEquipment({
  equipmentsRepository,
  imagesStorage,
  equipmentData,
  isToCreateImage = false,
}: createEquipmentProps) {
  const createEquipmentUseCases = new CreateEquipmentUseCases(
    equipmentsRepository,
    imagesStorage,
  )

  const filePath = path.resolve(
    __dirname,
    '..',
    '..',
    'utils',
    'test',
    'test.png',
  )
  const buffer = fs.readFileSync(filePath)

  const data = {
    name: 'Equipment-1',
    tag: 'A-1111-BB-222',
    description: 'The equipment-1',
    files: isToCreateImage
      ? [
          {
            buffer,
            contentType: 'image/png',
          },
        ]
      : [],
  }

  const { equipment } = await createEquipmentUseCases.execute(
    equipmentData ?? data,
  )

  return equipment
}
