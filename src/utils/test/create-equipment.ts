import { InMemoryEquipmentsRepository } from '@/repositories/in-memory/in-memory-equipments-repository'

export async function createEquipment(
  equipmentsRepository: InMemoryEquipmentsRepository,
) {
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

  const equipment = await equipmentsRepository.create(data)

  return equipment
}
