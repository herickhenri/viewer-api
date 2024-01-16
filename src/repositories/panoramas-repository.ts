import { Prisma } from '@prisma/client'

export type Panorama = {
  id: string
  name: string
  image: string
  gps_x: Prisma.Decimal
  gps_y: Prisma.Decimal
  markings?: {
    coord_x: number
    coord_y: number
    equipment_id: string
  }[]
}

export type PanoramaInput = {
  name: string
  image: string
  gps_x: number
  gps_y: number
  markings?: {
    coord_x: number
    coord_y: number
    equipment_id: string
  }[]
}

export type UpdatePanorama = {
  name?: string
  image?: string
  gps_x?: number
  gps_y?: number
  markings?: {
    coord_x: number
    coord_y: number
    equipment_id: string
  }[]
}

export interface PanoramasRepository {
  findById(id: string): Promise<Panorama | null>
  findMany(): Promise<Panorama[]>
  create(data: PanoramaInput): Promise<Panorama>
  update(data: UpdatePanorama, id: string): Promise<Panorama>
  delete(id: string): Promise<void>
}
