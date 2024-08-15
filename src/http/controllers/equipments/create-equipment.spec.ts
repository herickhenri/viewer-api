import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import path from 'node:path'

describe('Create Equipment (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to create equipment', async () => {
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'utils',
      'test',
      'test.png',
    )

    const response = await request(app.server)
      .post('/equipment')
      .field('name', 'Example-equipment')
      .field('description', 'Example-description')
      .field('tag', 'A-1111-BB-222')
      .attach('image-example', filePath)

    expect(response.statusCode).toEqual(201)
  })
})
