import {
  Equipment,
  EquipmentsRepository,
} from '../../../repositories/equipments-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

interface getEquipmentsRequest {
  ids: string[]
}

interface getEquipmentsResponse {
  equipments: Equipment[]
}

export class GetEquipmentsUseCases {
  constructor(private equipmentsRepository: EquipmentsRepository) {}

  async execute({ ids }: getEquipmentsRequest): Promise<getEquipmentsResponse> {
    const equipments = await this.equipmentsRepository.findByIds(ids)

    if (!equipments) {
      throw new ResourceNotFoundError()
    }

    return {
      equipments,
    }
  }
}
