import { EquipmentsRepository } from '../repositories/equipments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface deleteEquipmentRequest {
  id: string
}

export class DeleteEquipmentUseCases {
  constructor(private equipmentsRepository: EquipmentsRepository) {}

  async execute({ id }: deleteEquipmentRequest) {
    const equipment = await this.equipmentsRepository.findById(id)

    if (!equipment) {
      throw new ResourceNotFoundError()
    }

    await this.equipmentsRepository.delete(id)
  }
}
