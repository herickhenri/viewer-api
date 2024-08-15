import { expect, describe, it, beforeEach } from 'vitest'
import { UploadAllImagesUseCases } from './upload-all-images'
import { LocalImagesStorage } from '@/storage/local/local-images-storage'
import path from 'node:path'
import fs from 'node:fs'

let localImagesStorage: LocalImagesStorage
let sut: UploadAllImagesUseCases

describe('Upload Image Use Case', () => {
  beforeEach(() => {
    localImagesStorage = new LocalImagesStorage()
    sut = new UploadAllImagesUseCases(localImagesStorage)
  })

  it('shoud be able to upload image', async () => {
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      'utils',
      'test',
      'test.png',
    )
    const buffer = fs.readFileSync(filePath)
    const files = [
      {
        buffer,
        contentType: 'image/png',
      },
    ]

    const { images } = await sut.execute({ files })

    expect(images).toEqual([
      {
        key: expect.anything(),
        link: expect.anything(),
      },
    ])

    // reset tmp
    const keys = images.map((image) => image.key)
    localImagesStorage.deleteMany(keys)
  })
})
