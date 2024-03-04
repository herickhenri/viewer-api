import {
  Equipment,
  EquipmentInput,
  EquipmentsRepository,
} from '../../../repositories/equipments-repository'
import { EquipmentAlreadyExistsError } from '../../errors/equipment-already-exists-error'
import { IncorrectlyFormattedTagError } from '../../errors/incorrectly-formatted-tag-error'
import { checkTagFormat } from '../../../utils/check-tag-format'

type createEquipmentRequest = EquipmentInput

interface createEquipmentResponse {
  equipment: Equipment
}

export class CreateEquipmentUseCases {
  constructor(private equipmentsRepository: EquipmentsRepository) {}

  async execute({
    name,
    description,
    tag,
    photos,
  }: createEquipmentRequest): Promise<createEquipmentResponse> {
    const equipmentWithTheSameTag =
      await this.equipmentsRepository.findByTag(tag)

    if (equipmentWithTheSameTag) {
      throw new EquipmentAlreadyExistsError()
    }

    const tagIsCorrectFormat = checkTagFormat(tag)

    if (!tagIsCorrectFormat) {
      throw new IncorrectlyFormattedTagError()
    }

    const equipment = await this.equipmentsRepository.create({
      name,
      description,
      tag,
      photos,
    })

    return {
      equipment,
    }
  }
}
