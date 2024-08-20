import { File, Image, ImagesStorage } from '../images-storage'
import { randomUUID } from 'node:crypto'
import { s3Client } from '@/lib/s3Client'
import { env } from '@/env'
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
// TODO: tratativa de erros

export class CloudflareR2ImagesStorage implements ImagesStorage {
  async upload({ buffer, contentType }: File): Promise<Image> {
    const fileName = `${randomUUID()}`

    const command = new PutObjectCommand({
      Bucket: env.CLOUDFLARE_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: contentType || undefined,
    })

    await s3Client.send(command)

    const link = `${env.CLOUDFLARE_PUBLIC_URL}/${fileName}`

    const image = { key: fileName, link }

    return image
  }

  async delete(key: string) {
    const deleteObjectCommand = new DeleteObjectCommand({
      Bucket: env.CLOUDFLARE_BUCKET_NAME,
      Key: key,
    })

    await s3Client.send(deleteObjectCommand)
  }

  async uploadMany(files: File[]) {
    const images = await Promise.all(
      files.map(async (file) => {
        const fileName = `${randomUUID()}`

        const command = new PutObjectCommand({
          Bucket: env.CLOUDFLARE_BUCKET_NAME,
          Key: fileName,
          Body: file.buffer,
          ContentType: file.contentType || undefined,
        })

        await s3Client.send(command)

        const link = `${env.CLOUDFLARE_PUBLIC_URL}/${fileName}`

        const image = { key: fileName, link }
        return image
      }),
    )
    return images
  }

  async deleteMany(keys: string[]) {
    await Promise.all(
      keys.map(async (key) => {
        const deleteObjectCommand = new DeleteObjectCommand({
          Bucket: env.CLOUDFLARE_BUCKET_NAME,
          Key: key,
        })

        await s3Client.send(deleteObjectCommand)
      }),
    )
  }
}
