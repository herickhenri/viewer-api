export const acceptedTypes = ['image/png', 'image/jpg', 'image/jpeg']

export type File = {
  buffer: Buffer
  name?: string
  contentType: string
}

export type Image = {
  key: string
  link: string
}

export interface ImagesStorage {
  upload(file: File): Promise<Image>
  delete(key: string): Promise<void>
  uploadMany(files: File[]): Promise<Image[]>
  deleteMany(keys: string[]): Promise<void>
}
