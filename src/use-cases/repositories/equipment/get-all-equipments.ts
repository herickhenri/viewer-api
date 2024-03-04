import {
  Equipment,
  EquipmentsRepository,
} from '../../../repositories/equipments-repository'

interface getAllEquipmentsResponse {
  equipments: Equipment[]
}

export class GetAllEquipmentsUseCases {
  constructor(private equipmentsRepository: EquipmentsRepository) {}

  async execute(): Promise<getAllEquipmentsResponse> {
    const equipments = await this.equipmentsRepository.findMany()

    return {
      equipments,
    }
  }
}
