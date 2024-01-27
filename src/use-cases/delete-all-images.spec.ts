import { expect, describe, it, beforeEach } from 'vitest'
import { LocalImagesStorage } from '@/storage/local/local-images-storage'
import { DeleteAllImagesUseCases } from './delete-all-images'
import path from 'node:path'
import fs from 'node:fs'

let localImagesStorage: LocalImagesStorage
let sut: DeleteAllImagesUseCases

describe('Delete All Images Use Case', () => {
  beforeEach(() => {
    localImagesStorage = new LocalImagesStorage()
    sut = new DeleteAllImagesUseCases(localImagesStorage)
  })

  it('shoud be able to delete all images', async () => {
    const filePath = path.resolve(__dirname, '..', 'utils', 'test', 'test.png')
    const buffer = fs.readFileSync(filePath)
    const { key, link } = await localImagesStorage.upload({
      buffer,
      contentType: 'image/png',
      name: 'delete-all-images-test',
    })

    await sut.execute({ keys: [key] })

    expect(fs.existsSync(link)).toBeFalsy()
  })
})
