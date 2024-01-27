import { FastifyRequest, FastifyReply } from 'fastify'
import { UploadingImageError } from '@/use-cases/errors/uploading-image-error'
import { UnacceptedFileFormat } from '@/use-cases/errors/unaccepted-file-format'
import { makeUploadAllImagesUseCases } from '@/use-cases/factories/make-upload-all-images-use-cases'

type File = {
  buffer: Buffer
  name: string
  contentType: string
}

export async function uploadAllImages(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parts = request.files()
  const files: File[] = []

  for await (const part of parts) {
    if (part.type === 'file') {
      const image = {
        buffer: await part.toBuffer(),
        name: part.fieldname,
        contentType: part.mimetype,
      }
      files.push(image)
    }
  }

  if (!files) {
    throw new UploadingImageError()
  }

  try {
    const uploadAllImagesUseCases = makeUploadAllImagesUseCases()
    const { images } = await uploadAllImagesUseCases.execute({ files })

    return reply.status(201).send({ images })
  } catch (err) {
    if (err instanceof UploadingImageError) {
      return reply.status(400).send({ message: err.message })
    }
    if (err instanceof UnacceptedFileFormat) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
