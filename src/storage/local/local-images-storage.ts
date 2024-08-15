import { File, ImagesStorage } from '../images-storage'
import path from 'node:path'
import fs from 'node:fs/promises'
import { randomUUID } from 'node:crypto'

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
    const key = `${randomUUID()}${extension}`
    const filePath = `${this.storageDirectory}\\${key}`

    await fs.writeFile(filePath, buffer)

    return { key, name, link: filePath }
  }

  async delete(key: string) {
    const filePath = `${this.storageDirectory}\\${key}`
    await fs.unlink(filePath)
  }

  async uploadMany(files: File[]) {
    const imagesPromises = files.map(async ({ buffer, contentType }) => {
      const extension = this.getExtesion(contentType)
      const key = `${randomUUID()}${extension}`

      const filePath = `${this.storageDirectory}\\${key}`

      await fs.writeFile(filePath, buffer)

      return { key, link: filePath }
    })

    const images = await Promise.all(imagesPromises)

    return images
  }

  async deleteMany(keys: string[]) {
    const deletePromises = keys.map(async (key) => {
      const filePath = `${this.storageDirectory}\\${key}`
      await fs.unlink(filePath)
    })

    await Promise.all(deletePromises)
  }
}
