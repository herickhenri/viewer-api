export type Panorama = {
  id: string
  name: string
  images: {
    key: string
    link: string
    quality: number
  }[]
  equipments?: {
    yaw: number
    pitch: number
    equipment_id: string
  }[]
  notes?: {
    yaw: number
    pitch: number
    note_id: string
  }[]
  connections_from?: {
    yaw: number
    pitch: number
    connected_to_id: string
    connected_from_id: string
  }[]
  connections_to?: {
    yaw: number
    pitch: number
    connected_to_id: string
    connected_from_id: string
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
    yaw: number
    pitch: number
    equipment_id: string
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
    yaw: number
    pitch: number
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
