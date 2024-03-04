import { expect, describe, it, beforeEach } from 'vitest'
import { LocalImagesStorage } from '@/storage/local/local-images-storage'
import { DeleteImageUseCases } from './delete-image'
import path from 'node:path'
import fs from 'node:fs'

let localImagesStorage: LocalImagesStorage
let sut: DeleteImageUseCases

describe('Delete Image Use Case', () => {
  beforeEach(() => {
    localImagesStorage = new LocalImagesStorage()
    sut = new DeleteImageUseCases(localImagesStorage)
  })

  it('shoud be able to delete image', async () => {
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      'utils',
      'test',
      'test.png',
    )
    const buffer = fs.readFileSync(filePath)
    const { key, link } = await localImagesStorage.upload({
      buffer,
      contentType: 'image/png',
      name: 'delete-image-test',
    })

    await sut.execute({ key })

    expect(fs.existsSync(link)).toBeFalsy()
  })
})
