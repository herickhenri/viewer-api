import { Prisma } from '@prisma/client'
import { Equipment } from './equipments-repository'

export type Panorama = {
  id: string
  name: string
  image_key: string
  image_link: string
  gps_x: Prisma.Decimal | null
  gps_y: Prisma.Decimal | null
  markings?: {
    coord_x: number
    coord_y: number
    equipment: Equipment
  }[]
  links?: {
    coord_x: number
    coord_y: number
    panorama_connect_id: string
  }[]
}

export type PanoramaInput = {
  name: string
  image_key: string
  image_link: string
  gps_x?: number
  gps_y?: number
  markings?: {
    coord_x: number
    coord_y: number
    equipment_id: string
  }[]
  links?: {
    coord_x: number
    coord_y: number
    panorama_connect_id: string
  }[]
}

export type UpdatePanorama = {
  name?: string
  image_key?: string
  image_link?: string
  gps_x?: number
  gps_y?: number
  markings?: {
    coord_x: number
    coord_y: number
    equipment_id: string
  }[]
  links?: {
    coord_x: number
    coord_y: number
    panorama_connect_id: string
  }[]
}

export interface PanoramasRepository {
  findById(id: string): Promise<Panorama | null>
  findMany(): Promise<Panorama[]>
  create(data: PanoramaInput): Promise<Panorama>
  update(data: UpdatePanorama, id: string): Promise<Panorama>
  delete(id: string): Promise<void>
}
