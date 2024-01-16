import {
  Equipment,
  EquipmentsRepository,
} from '../repositories/equipments-repository'

interface getEquipmentsResponse {
  equipments: Equipment[]
}

export class GetEquipmentsUseCases {
  constructor(private equipmentsRepository: EquipmentsRepository) {}

  async execute(): Promise<getEquipmentsResponse> {
    const equipments = await this.equipmentsRepository.findMany()

    return {
      equipments,
    }
  }
}
