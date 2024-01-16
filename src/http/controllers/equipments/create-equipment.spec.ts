import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Equipment (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to create equipment', async () => {
    const response = await request(app.server)
      .post('/equipment')
      .send({
        name: 'Bomba de lama',
        description: 'Bomba de lama para o LMCD 1',
        tag: 'I-1501-BB-101',
        photos: ['http://photo/file'],
      })

    expect(response.statusCode).toEqual(201)
  })
})
