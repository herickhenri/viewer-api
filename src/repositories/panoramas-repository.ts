import { Prisma } from '@prisma/client'

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
    equipment_id: string
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

export type Link = {
  panorama_connect_id: string
  panorama_id: string
  coord_x: number
  coord_y: number
}

export type Connection = [Link, Link]

export type IdsOfPanoramaConnectionRelations = {
  panorama_id: string
  panorama_connect_id: string
}

export interface PanoramasRepository {
  findById(id: string): Promise<Panorama | null>
  findMany(): Promise<Panorama[]>
  create(data: PanoramaInput): Promise<Panorama>
  update(data: UpdatePanorama, id: string): Promise<Panorama>
  delete(id: string): Promise<void>
  createConnection(connection: Connection): Promise<void>
  deleteConnection(
    idsOfPanoramaConnectionRelations: IdsOfPanoramaConnectionRelations,
  ): Promise<void>
}
