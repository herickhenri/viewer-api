import { expect, describe, it, beforeEach } from 'vitest'
import { UploadImageUseCases } from './upload-image'
import { LocalImagesStorage } from '@/storage/local/local-images-storage'
import path from 'node:path'
import fs from 'node:fs'

let localImagesStorage: LocalImagesStorage
let sut: UploadImageUseCases

describe('Upload Image Use Case', () => {
  beforeEach(() => {
    localImagesStorage = new LocalImagesStorage()
    sut = new UploadImageUseCases(localImagesStorage)
  })

  it('shoud be able to upload image', async () => {
    const filePath = path.resolve(__dirname, '..', 'utils', 'test', 'test.png')
    const buffer = fs.readFileSync(filePath)
    const { image } = await sut.execute({buffer, contentType: 'image/png', name: 'image-1'})

    expect(image.name).toEqual('image-1')
    
    //reset tmp
    localImagesStorage.delete(image.key)
  })
})
