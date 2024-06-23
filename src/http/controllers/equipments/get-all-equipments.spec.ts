import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Equipments (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to get equipments', async () => {
    await request(app.server)
      .post('/equipment')
      .send({
        name: 'Bomba de lama',
        description: 'Bomba de lama para o LMCD 1',
        tag: 'I-1501-BB-101',
        photos: [
          {
            key: 'example-key',
            link: 'example-link',
          },
        ],
      })

    const response = await request(app.server).get(`/all-equipments`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.equipments).toBeTruthy()
  })
})
