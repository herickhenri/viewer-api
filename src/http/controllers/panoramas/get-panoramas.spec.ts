import request from 'supertest'
import { app } from '../../../app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Panoramas (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('shoud be able to get panoramas', async () => {
    const createResponse = await request(app.server).post('/panorama').send({
      name: 'panorama-1',
      image: 'http://file/panorama-1',
      gps_x: 100,
      gps_y: 150,
    })
    const equipmentCreated = createResponse.body.panorama

    const response = await request(app.server).get(`/panoramas`)

    expect(response.statusCode).toEqual(200)
    expect([equipmentCreated]).toEqual(response.body.panoramas)
  })
})
