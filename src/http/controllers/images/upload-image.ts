import { FastifyRequest, FastifyReply } from 'fastify'
import { UploadingImageError } from '@/use-cases/errors/uploading-image-error'
import { UnacceptedFileFormat } from '@/use-cases/errors/unaccepted-file-format'
import { makeUploadImageUseCases } from '@/use-cases/factories/make-upload-image-use-cases'
import { writeFile } from 'fs/promises'
import { join } from 'path'
import util from 'node:util'
import { pipeline } from 'node:stream'
import fs from 'fs'

const pump = util.promisify(pipeline)

type File = {
  buffer: Buffer
  name: string
  contentType: string
}

export async function uploadImage(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const parts = request.parts()
  const data: Record<string, string> = {}
  const files: File[] = []

  for await (const part of parts) {
    if (part.type === 'file') {
      const image = {
        buffer: await part.toBuffer(),
        name: part.fieldname,
        contentType: part.mimetype,
      }
      files.push(image)
    } else {
      // part.type === 'field
      data[part.fieldname] = String(part.value)
    }
  }

  reply.send({ data, files })

  // Save the file to disk
  // await writeFile(savePath, file)

  // const data = await request.file()

  // if (!data) {
  //   throw new UploadingImageError()
  // }

  // const buffer = await data.toBuffer()
  // const contentType = data.mimetype
  // const name = data.filename

  // try {
  //   const uploadImageUseCases = makeUploadImageUseCases()

  //   const image = await uploadImageUseCases.execute({
  //     name,
  //     buffer,
  //     contentType,
  //   })

  //   return reply.status(201).send(image)
  // } catch (err) {
  //   if (err instanceof UploadingImageError) {
  //     return reply.status(400).send({ message: err.message })
  //   }
  //   if (err instanceof UnacceptedFileFormat) {
  //     return reply.status(400).send({ message: err.message })
  //   }
  //   throw err
  // }
}
