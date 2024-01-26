import { File, Image, ImagesStorage } from '../images-storage'
import path from 'node:path'
import fs from 'fs'
import { randomUUID } from 'node:crypto'
import { UploadingImageError } from '../../use-cases/errors/uploading-image-error'

export class LocalImagesStorage implements ImagesStorage {
  private storageDirectory: string

  constructor() {
    this.storageDirectory = path.resolve(
      __dirname,
      '..',
      '..',
      'tmp',
      'uploads',
    )
  }

  private getExtesion(contentType: string) {
    // Example: image/png -> .png
    const extension = contentType.replace('image/', '.')

    return extension
  }

  async upload({ buffer, name, contentType }: File) {
    const extension = this.getExtesion(contentType)
    const key = `${name}-${randomUUID()}${extension}`
    const filePath = `${this.storageDirectory}\\${key}`

    fs.writeFile(filePath, buffer, (err) => {
      if (err) {
        throw new UploadingImageError()
      }
    })

    const image = { key, name, link: filePath }

    return image
  }

  async delete(key: string) {
    const filePath = `${this.storageDirectory}\\${key}`
    fs.unlink(filePath, (err) => {
      if (err) {
        throw new Error()
      }
    })
  }

  async uploadMany(files: File[]) {
    const images: Image[] = []

    files.forEach(({ buffer, name, contentType }) => {
      const extension = this.getExtesion(contentType)
      const key = `${name}-${randomUUID()}${extension}`

      const filePath = `${this.storageDirectory}\\${key}`

      fs.writeFile(filePath, buffer, (err) => {
        if (err) {
          throw new UploadingImageError()
        }
      })
    })

    return images
  }

  async deleteMany(keys: string[]): Promise<void> {
    keys.forEach((key) => {
      const filePath = `${this.storageDirectory}\\${key}`
      fs.unlink(filePath, (err) => {
        if (err) {
          throw new Error()
        }
      })
    })
  }
}
