import { FastifyRequest, FastifyReply } from 'fastify'
import { UploadingImageError } from '@/use-cases/errors/uploading-image-error'
import { UnacceptedFileFormat } from '@/use-cases/errors/unaccepted-file-format'
import { makeUploadImageUseCases } from '@/use-cases/factories/make-upload-image-use-cases'

export async function uploadImage(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const data = await request.file()
  console.log(data)

  if (!data) {
    throw new UploadingImageError()
  }

  const buffer = await data.toBuffer()
  const contentType = data.mimetype
  const name = data.filename

  try {
    const uploadImageUseCases = makeUploadImageUseCases()

    const image = await uploadImageUseCases.execute({
      name,
      buffer,
      contentType,
    })

    return reply.status(201).send(image)
  } catch (err) {
    if (err instanceof UploadingImageError) {
      return reply.status(400).send({ message: err.message })
    }
    if (err instanceof UnacceptedFileFormat) {
      return reply.status(400).send({ message: err.message })
    }
    console.log(err)
    throw err
  }
}
