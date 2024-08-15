import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Note (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to create note', async () => {
    const response = await request(app.server).post('/note').send({
      author: 'Jhon',
      created_at: new Date(),
      description: 'example-description',
      equipment_tag: 'A-1111-BB-222',
      id: 'example-id',
      opportunity: 0,
    })

    expect(response.statusCode).toEqual(201)
  })
})
