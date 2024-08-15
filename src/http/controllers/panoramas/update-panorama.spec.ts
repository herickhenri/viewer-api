import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import path from 'node:path'

describe('Update Panorama (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.only('shoud be able to update panorama', async () => {
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'utils',
      'test',
      'test.png',
    )

    const createResponse = await request(app.server)
      .post('/panorama')
      .field('name', 'panorama-1')
      .attach('file', filePath)

    const { id }: { id: string } = createResponse.body.panorama

    const response = await request(app.server)
      .patch(`/panorama/${id}`)
      .field('name', 'panorama-2')

    expect(response.statusCode).toEqual(200)
    expect(response.body.panorama.name).toEqual('panorama-2')
  })
})
