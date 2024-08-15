import {
  Equipment,
  EquipmentsRepository,
} from '../../../repositories/equipments-repository'
import { EquipmentAlreadyExistsError } from '../../errors/equipment-already-exists-error'
import { IncorrectlyFormattedTagError } from '../../errors/incorrectly-formatted-tag-error'
import { checkTagFormat } from '../../../utils/check-tag-format'
import { ImagesStorage } from '@/storage/images-storage'

interface createEquipmentRequest {
  name: string
  description?: string
  tag: string
  files?: {
    buffer: Buffer
    contentType: string
  }[]
}

interface createEquipmentResponse {
  equipment: Equipment
}

export class CreateEquipmentUseCases {
  constructor(
    private equipmentsRepository: EquipmentsRepository,
    private imagesStorage: ImagesStorage,
  ) {}

  async execute({
    name,
    description,
    tag,
    files,
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

    const photos = files && (await this.imagesStorage.uploadMany(files))

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
