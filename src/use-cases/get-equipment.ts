import {
  Equipment,
  EquipmentsRepository,
} from '../repositories/equipments-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface getEquipmentRequest {
  id: string
}

interface getEquipmentResponse {
  equipment: Equipment
}

export class GetEquipmentUseCases {
  constructor(private equipmentsRepository: EquipmentsRepository) {}

  async execute({ id }: getEquipmentRequest): Promise<getEquipmentResponse> {
    const equipment = await this.equipmentsRepository.findById(id)

    if (!equipment) {
      throw new ResourceNotFoundError()
    }

    return {
      equipment,
    }
  }
}
