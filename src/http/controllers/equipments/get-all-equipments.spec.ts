import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import path from 'node:path'

describe('Get Equipments (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to get equipments', async () => {
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'utils',
      'test',
      'test.png',
    )

    await request(app.server)
      .post('/equipment')
      .field('name', 'Example-equipment')
      .field('description', 'Example-description')
      .field('tag', 'A-1111-BB-222')
      .attach('image-example', filePath)

    const response = await request(app.server).get(`/all-equipments`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.equipments).toBeTruthy()
  })
})
