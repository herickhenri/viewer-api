import { ImagesStorage } from '@/storage/images-storage'
import { EquipmentsRepository } from '../../../repositories/equipments-repository'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

interface deleteEquipmentRequest {
  id: string
}

export class DeleteEquipmentUseCases {
  constructor(
    private equipmentsRepository: EquipmentsRepository,
    private imagesStorage: ImagesStorage,
  ) {}

  async execute({ id }: deleteEquipmentRequest) {
    const equipment = await this.equipmentsRepository.findById(id)

    if (!equipment) {
      throw new ResourceNotFoundError()
    }

    const imageKeys = equipment.photos?.map(({ key }) => key)

    imageKeys && (await this.imagesStorage.deleteMany(imageKeys))

    await this.equipmentsRepository.delete(id)
  }
}
