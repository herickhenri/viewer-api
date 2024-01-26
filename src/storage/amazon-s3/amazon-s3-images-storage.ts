import { File, Image, ImagesStorage } from '../images-storage'
import { randomUUID } from 'node:crypto'
import S3Client from 'aws-sdk/clients/s3'
import { env } from '@/env'

export class AmazonS3ImagesStorage implements ImagesStorage {
  private s3Client: S3Client
  constructor() {
    this.s3Client = new S3Client({
      region: env.AWS_DEFAULT_REGION,
      credentials: {
        accessKeyId: env.AWS_ACESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACESS_KEY,
      },
      endpoint: 's3.us-west-2.amazonaws.com',
    })
  }

  async upload({ buffer, contentType, name }: File) {
    const fileName = `${name}-${randomUUID()}`

    const uploadParams = {
      Bucket: env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ACL: 'public-read',
      ContentType: contentType || undefined,
    }

    const { Location: link, Key: key } = await this.s3Client
      .upload(uploadParams)
      .promise()

    const image = { key, link, name: fileName }

    return image
  }

  async delete(key: string) {
    await this.s3Client
      .deleteObject({
        Bucket: env.AWS_BUCKET_NAME,
        Key: key,
      })
      .promise()
  }

  async uploadMany(files: File[]) {
    const images: Image[] = []

    files.forEach(async (file) => {
      const fileName = `${file.name}-${randomUUID()}`

      const uploadParams = {
        Bucket: env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.contentType || undefined,
      }

      const { Location: link, Key: key } = await this.s3Client
        .upload(uploadParams)
        .promise()

      const image = { key, link, name: fileName }

      images.push(image)
    })

    return images
  }

  async deleteMany(keys: string[]) {
    keys.forEach(async (key) => {
      await this.s3Client
        .deleteObject({
          Bucket: env.AWS_BUCKET_NAME,
          Key: key,
        })
        .promise()
    })
  }
}
