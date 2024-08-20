import { Image, ImagesStorage } from '@/storage/images-storage'
import {
  Equipment,
  EquipmentsRepository,
} from '../../../repositories/equipments-repository'
import { checkTagFormat } from '../../../utils/check-tag-format'
import { EquipmentAlreadyExistsError } from '../../errors/equipment-already-exists-error'
import { IncorrectlyFormattedTagError } from '../../errors/incorrectly-formatted-tag-error'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

interface updateEquipmentRequest {
  id: string
  data: {
    name?: string
    description?: string
    tag?: string
    files?: {
      buffer: Buffer
      contentType: string
    }[]
    photos?: {
      key: string
      link: string
    }[]
  }
}

interface updateEquipmentResponse {
  equipment: Equipment
}

export class UpdateEquipmentUseCases {
  constructor(
    private equipmentsRepository: EquipmentsRepository,
    private imagesStorage: ImagesStorage,
  ) {}

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

      const equipmentChangeTag = equipmentFound.tag !== data.tag

      if (equipmentWithTheSameTag && equipmentChangeTag) {
        throw new EquipmentAlreadyExistsError()
      }

      const tagIsCorrectFormat = checkTagFormat(data.tag)

      if (!tagIsCorrectFormat) {
        throw new IncorrectlyFormattedTagError()
      }
    }

    if (data.photos) {
      const photosAlreadyExists = data.photos.every((dataPhoto) =>
        equipmentFound.photos?.some(
          (equipPhoto) =>
            equipPhoto.key === dataPhoto.key &&
            equipPhoto.link === dataPhoto.link,
        ),
      )

      if (!photosAlreadyExists) {
        throw new ResourceNotFoundError()
      }
    }

    const photosKept = data.photos

    let photos: Image[] | undefined = photosKept
    let uploadedPhotos: Image[] | undefined

    const photosToDelete: Image[] | undefined = equipmentFound.photos?.filter(
      (photo) => photosKept?.every((photoKept) => photoKept.key !== photo.key),
    )

    if (data.files?.length) {
      uploadedPhotos = await this.imagesStorage.uploadMany(data.files)

      photos = photos ? photos.concat(uploadedPhotos) : uploadedPhotos
    }

    try {
      const equipment = await this.equipmentsRepository.update(
        {
          description: data.description,
          name: data.name,
          tag: data.tag,
          photos,
        },
        id,
      )

      if (photosToDelete) {
        const oldKeys = photosToDelete.map(({ key }) => key)
        oldKeys && (await this.imagesStorage.deleteMany(oldKeys))
      }

      return { equipment }
    } catch {
      // if error after upload images, it`s necessary to delete the saved images
      if (uploadedPhotos) {
        const keys = uploadedPhotos.map(({ key }) => key)
        await this.imagesStorage.deleteMany(keys)
      }

      throw new Error()
    }
  }
}
