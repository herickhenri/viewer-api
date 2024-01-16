import {
  Equipment,
  EquipmentsRepository,
  UpdateEquipment,
} from '../repositories/equipments-repository'
import { checkTagFormat } from '../utils/check-tag-format'
import { EquipmentAlreadyExistsError } from './errors/equipment-already-exists-error'
import { IncorrectlyFormattedTagError } from './errors/incorrectly-formatted-tag-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface updateEquipmentRequest {
  id: string
  data: UpdateEquipment
}

interface updateEquipmentResponse {
  equipment: Equipment
}

export class UpdateEquipmentUseCases {
  constructor(private equipmentsRepository: EquipmentsRepository) {}

  async execute({
    data,
    id,
  }: updateEquipmentRequest): Promise<updateEquipmentResponse> {
    const equipmentFound = await this.equipmentsRepository.findById(id)

    if (!equipmentFound) {
      throw new ResourceNotFoundError()
    }

    if (data.tag) {
      const equipmentWithTheSameTag = await this.equipmentsRepository.findByTag(
        data.tag,
      )

      if (equipmentWithTheSameTag) {
        throw new EquipmentAlreadyExistsError()
      }

      const tagIsCorrectFormat = checkTagFormat(data.tag)

      if (!tagIsCorrectFormat) {
        throw new IncorrectlyFormattedTagError()
      }
    }

    const equipment = await this.equipmentsRepository.update(data, id)

    return { equipment }
  }
}
