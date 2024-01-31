import { InMemoryEquipmentsRepository } from '@/repositories/in-memory/in-memory-equipments-repository'

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
  equipmentData?: Equipment
}

export async function createEquipment({
  equipmentsRepository,
  equipmentData,
}: createEquipmentProps) {
  const data = {
    name: 'Equipment-1',
    tag: 'A-1111-BB-222',
    description: 'The equipment-1',
    photos: [
      {
        link: 'example-link',
        key: 'example-key',
      },
    ],
  }

  const equipment = await equipmentsRepository.create(equipmentData || data)

  return equipment
}
