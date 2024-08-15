export type Panorama = {
  id: string
  name: string
  images: {
    key: string
    link: string
    quality: number
  }[]
  equipments?: {
    coord_x: number
    coord_y: number
    equipment_id: string
  }[]
  notes?: {
    coord_x: number
    coord_y: number
    note_id: string
  }[]
  links?: {
    coord_x: number
    coord_y: number
    panorama_connect_id: string
  }[]
}

export type PanoramaInput = {
  name: string
  images: {
    key: string
    link: string
    quality: number
  }[]
  equipments?: {
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
  images?: {
    key: string
    link: string
    quality: number
  }[]
  equipments?: {
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
