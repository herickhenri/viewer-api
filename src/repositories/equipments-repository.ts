import { Note } from './notes-repository'
import { Panorama } from './panoramas-repository'

export type Equipment = {
  id: string
  name: string
  description: string | null
  tag: string
  photos?: {
    key: string
    link: string
  }[]
  panoramas?: Panorama[]
  notes?: Note[]
}

export type EquipmentInput = {
  name: string
  description?: string
  tag: string
  photos?: {
    key: string
    link: string
  }[]
}

export type UpdateEquipment = {
  name?: string
  description?: string
  tag?: string
  photos?: {
    key: string
    link: string
  }[]
}

export interface EquipmentsRepository {
  findByTag(tag: string): Promise<Equipment | null>
  findById(id: string): Promise<Equipment | null>
  findByIds(ids: string[]): Promise<Equipment[] | null>
  findMany(): Promise<Equipment[]>
  create(data: EquipmentInput): Promise<Equipment>
  update(data: UpdateEquipment, id: string): Promise<Equipment>
  delete(id: string): Promise<void>
}
