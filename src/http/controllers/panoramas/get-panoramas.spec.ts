import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import path from 'node:path'

describe('Get Panoramas (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to get panoramas', async () => {
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

    const panoramaCreated = createResponse.body.panorama

    const response = await request(app.server).get(`/panoramas`)

    console.log({ panoramaCreated })

    expect(response.statusCode).toEqual(200)
    expect([panoramaCreated]).toEqual(response.body.panoramas)
  })
})
